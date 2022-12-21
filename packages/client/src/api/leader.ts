import { ForumBaseAPI } from './base';
import { ApiResponse } from '../types/api';
import CONSTS from '../utils/consts';
import { Leader } from '../pages/leaderBoard/types';
import { LeaderBoardData } from '../types/leaders';

class LeaderAPI extends ForumBaseAPI {
  constructor() {
    super('/leaderboard');
  }

  addLeader(leader: Leader): ApiResponse<'OK'> {
    return this.httpService.post('/', {
      body: {
        data: leader,
        // Which field is used to sort (if new value of the field more than old, data is stored)
        ratingFieldName: CONSTS.RATING_FIELD,
        // Team name. Used to make unique leaderboard for each project.
        teamName: CONSTS.TEAM,
      },
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getLeaders({
    pageNumber,
    countPerPage,
  }: LeaderBoardData): ApiResponse<{ data: Leader }[]> {
    return this.httpService.post(`/${CONSTS.TEAM}`, {
      body: {
        // Which field is used to sort
        ratingFieldName: CONSTS.RATING_FIELD,
        // Used to paginate between pages. If limit is 10, then for the 1st page - cursor=0, for the 2nd page - cursor=10.
        cursor: pageNumber * countPerPage - countPerPage,
        // Maximum amount of leaders to return
        limit: countPerPage,
      },
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

const leaderAPI = new LeaderAPI();

export default leaderAPI;
