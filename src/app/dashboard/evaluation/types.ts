export interface Lesson {

  id: string;

  title: string;

  classRoomId: string;

}

export interface Student {

  apprenticeId: string;

  apprentice: {

    person: {

      name: string;

    };

  };

}

export interface EvaluationItem {

  communication: number;

  behavior: number;

  attendance: number;

  performance: number;

  comments: string;

}

export interface EvaluationMap {

  [key: string]: EvaluationItem;

}