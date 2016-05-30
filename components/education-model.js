'use strict';

const DEGREE_TYPE_REGEX_1 = \((bachelor|bachelors|master|masters|doctorate)[\\n|\\r| ]+of[\\n|\\r| ]+\w+[\\n|\\r| ]+degree[\\n|\\r| ]+in[\\n|\\r| ]+(\w)[\\n|\\r| ]+(.+?) from (.+?) in (\d\d\d\d))\i,
    DEGREE_TYPE_REGEX_2 = \((bachelor|bachelors|master|masters|doctorate)[\\n|\\r| ]+in[\\n|\\r| ]+\w+[\\n|\\r| ]+(.+?) from (.+?) in (\d\d\d\d))\i;

export class Education{

    constructor(data){
    
    }

    get institution(){
        return this._institution;
    }

    get year(){
        return this._year;
    }

    get major(){
        return this._major;
    }

    get level(){
        return this._level;
    }

    static parseEducation(data){
        let education = data['EDUCATION:'],
            educations = [];

        if(education){
            


        }


        return educations;
    }
};

export default Education;