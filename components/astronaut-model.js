'use strict';

import Education from './education-model.js';

const BIRTHDAY_REGEX = /(\w+) (\d+), (\d+)/,
    MONTH_INDEXES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export class Astronaut {
    constructor(data){
        this.parseData(data);
    }

    parseData(data){
        this.parseName(data);
        this.parseBirthday(data);
        this._selectionGroup = data.selectionGroup;
        this._link = data.link;
        this._selectionYear = data.selectionYear;
        this._isFormer = data.currentStatus === 'Former' || data.currentStatus === 'Deceased';
        this._awards = data['AWARDS:'] ? data['AWARDS:'].replace('\r\n', '').split(';') : [];
        this._organizations = data['ORGANIZATIONS:'] ? data['ORGANIZATIONS:'].replace('\r\n', '').split(';') : [];
        this._specialHonors = data['SPECIAL_HONORS:'] ? data['SPECIAL_HONORS:'].replace('\r\n', '').split(';') : [];
        this._experience = data['EXPERIENCE:'];
    }

    parseName(data){
        let fullName = data.name.split(',');
        this._lastName= fullName[0].trim();
        let nameSplit = fullName[1].trim().split(' ');
        this._firstName = nameSplit[0].trim();
        this._middleName = nameSplit.length > 1 ? nameSplit[1].trim() : '';
    }

    parseBirthday(data){
        let birthday = data['PERSONAL_DATA:'].match(BIRTHDAY_REGEX);

        this._birthday = new Date(birthday[1], MONTH_INDEXES.indexOf(birthday[2]), birthday[3]);
    }

    get firstName(){
        return this._firstName;
    }

    get lastName(){
        return this._lastName;
    }

    get middleName(){
        return this._middleName;
    }

    get fullName(){
        return `${this.firstName} ${this.middleName} ${this.lastName}`;
    }

    get degrees(){

    }

    get isFormer(){
        return this._isFormer;
    }

    get selectionYear(){
        return this._selectionYear;
    }

    get organizations(){
        return this._organizations;
    }

    get selectionGroup(){
        return this._selectionGroup;
    }

    get birthday(){
        return this._birthday;
    }

    get link(){
        return this._link;
    }

    get experience(){
        return this._experience;
    }

    get specialHonors(){
        return this._specialHonors;
    }

    get awards(){
        return this._awards;
    }

}

export default Astronaut;