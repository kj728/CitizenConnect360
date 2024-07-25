export interface IVote {
    id: string,
    pollid: string,
    choiceid: string,
    voterid: string,
    isDeleted: number
}


export interface addVote {
    pollid: string,
    choiceid: string,
 
}


export interface AddVoteResponse{
    message: string
}

