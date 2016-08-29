
export default class Astronaut{
    constructor(json, id){
        this.id = id;
        this._name = json.name;
        this._education = json['EDUCATION:'];
        this._title = json.title;
        this._personalData = json['PERSONAL_DATA:'];
        this._militaryExperience = json['MILITARY_EXPERIENCE:'];
        this._selectionYear = json.selectionYear;
        this._specialHonors = json['SPECIAL_HONORS:'];
        this._organizations = json['ORGANIZATIONS:'];
        this._spaceFlightExperience = json['SPACE_FLIGHT_EXPERIENCE:'];
        this._otherInformation = json['OTHER_INFORMATION'];
        this._link = json.link;
        this._selectionGroup = json.selectionGroup;
        this._currentStatus = json.currentStatus;
        this._publications = json['PUBLICATIONS:'];
        this._nasaExperience = json['NASA_EXPERIENCE:'];
        this._experience = json['EXPERIENCE:'];
    }

    get name() {return this._name;}
    get education() {return this._education;}
    get title() {return this._title;}
    get personalData() {return this._personalData;}
    get militaryExperience() { return this._militaryExperience;}
    get selectionYear() { return this._selectionYear;}
    get isActive() {return this._currentStatus === 'Active';}
    get isActiveDescription() { return this.isActive ? 'Yes': 'No';}
    get link(){return this._link;}
    get selectionGroup() { return this._selectionGroup;}
    
}