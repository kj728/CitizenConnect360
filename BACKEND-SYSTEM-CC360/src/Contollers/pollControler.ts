import { Request, Response, RequestHandler } from "express"

import path from "path";
import dotenv from "dotenv";
import { IPoll, Poll, PollRequest } from "../Models/Poll";
import { v4 as uid } from 'uuid';
import { DBHelper } from "../Database Helpers";
import { IChoice } from "../Models/Choices";

import { ExtendedRequest } from "../Middlewares/verifyTokens";
import { IVote, VoteRequest } from "../Models/Votes";
import { any } from "joi";

dotenv.config({ path: path.resolve(__dirname, "../../.env") })

const dbInstance = new DBHelper();



export const addPoll = (req: PollRequest, res: Response) => {

  try {
    const pollid = uid();
    const createdby = req.info?.sub
    const { question, startdate, enddate, choices } = req.body

    if (createdby) {


      //add the question to the database
      dbInstance.exec("addPoll", { id: pollid, question, startdate, enddate, createdby });

      for (let choice of choices) {
        const choiceid = uid();
        dbInstance.exec("addChoice", { id: choiceid, pollid: pollid, choicetext: choice });
      }

      return res.json({ message: "Poll created successfully" })
    } else {
      return res.json({ message: "Please log in" })
    }



  } catch (error) {
    return res.status(500).json({ message: "Something went wrong " + error })
  }


}

export const getAllPolls: RequestHandler = async (req, res) => {

  try {
    //get  the polls
    const polls = (await dbInstance.exec("getAllPolls", {})).recordset as IPoll[]
    const choices = (await dbInstance.exec("getAllChoices", {})).recordset as IChoice[]
    if (polls.length === 0) {
      return res.status(400).json({ message: "No polls available" })
    }

    if (choices.length === 0) {
      return res.status(400).json({ message: "No choices available" })
    }

    const allPolls:Poll[] = []

    for (let poll of polls) {
      let choicesArray: IChoice[] = choices.filter(choice => choice.pollid === poll.id)

      const onePoll: Poll = {
        poll,
        choicesArray 
      }
      allPolls.push(onePoll)
    }

    return res.status(200).json(allPolls)
  } catch (error) {

  }
}

export const addVote = async (req: VoteRequest, res: Response) => {
  try {
    const id = uid();
    const voterid = req.info?.sub;
    const role = req.info?.role;
    const { pollid, choiceid } = req.body;

    if (role !== 'Citizen') {
      return res.status(403).json({ message: "You are not allowed to vote" });
    }

    if (!voterid) {
      return res.status(400).json({ message: "Voter id not found" });
    }

    const allVotes = (await dbInstance.exec("getAllVotes", {})).recordset as IVote[];

    const hasVoted = allVotes.some(vote => vote.voterid === voterid && vote.pollid === pollid);

    if (hasVoted) {
      return res.status(400).json({ message: "You have already voted in this poll" });
    }

    await dbInstance.exec("addVote", { id, pollid, choiceid, voterid });
    await dbInstance.exec("updateVoteCount", { id: choiceid });

    console.log("Vote executed successfully");
    return res.status(200).json({ message: "Vote captured successfully" });

  } catch (error) {
    return res.status(500).json({ message: "Something went wrong: " + error });
  }
}

export const getSpecificPoll = async (req: Request<{id:string}>, res: Response) => {

  try {

    const id = req.params.id;

    const poll = (await dbInstance.exec("getSpecificPollById", { id })).recordset[0] as IPoll;
    const choices = (await dbInstance.exec("getAllChoices", {})).recordset as IChoice[]
    if (poll && poll.id) {

      let choiceArray: IChoice[] = choices.filter(choice => choice.pollid === poll.id)

      const onePoll = {
        poll,
        choiceArray
      }

      return res.status(200).json(onePoll)

    }

    return res.status(400).json({ message: "No poll found" });

  } catch (error) {
    return res.status(500).json({ message: "Something went wrong: " + error });
  }
}
