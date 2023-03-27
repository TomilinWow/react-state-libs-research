import * as mobx from "mobx";
import { makeObservable, observable } from "mobx";
import axios from 'axios';
import { runInThisContext } from "vm";

const options = {
  method: 'GET',
  url: 'https://api.open-meteo.com/v1/forecast?latitude=59.94&longitude=30.31&current_weather=true&daily=sunrise,sunset&timezone=Europe/Moscow',
};

const DEVIDER_SIZE = 40;

const id = (): string => {
        return `${(Math.random()*100)}-${(Date.now())}`
    }

interface ISectionProps {
     width: number,
      height: number,
      frameSize?: number,
    type?: string,
    sections?: (Section | Devider)[],
    id?: string;

}

interface IDeviderProps {
     width: number,
      height: number
}

export class Section {
    public nodeType = "section";

    @observable
    public id: string;

    @observable
    public width: number;

    @observable
    public height: number;

    @observable
    public frameSize: number = 0;

    @observable
    public type: string = "none";

    @observable
    public splitDirection: string | null = null;

    @observable
    public sections: (Section | Devider)[] = []
        
    constructor(props: ISectionProps) {
        this.id =props.id ?? id();
        this.width = props.width;
        this.height = props.height;
        this.frameSize = props.frameSize ?? 0;
        this.type = props.type ?? "none";
        this.sections = props.sections ?? [];
        
        makeObservable(this);
    }
    
    @mobx.action
    public setFrameSize = (frameSize: number): void => {
      if (frameSize > this.height || frameSize > this.width) return;
        this.frameSize = frameSize;
    }
}


export class Weather {
  @observable
  public weathercode: string | null = null;
  @observable
  public sunset: string | null = null;
  @observable
  public sunrise: string | null = null;
  @observable
  public time: string | null = null;
  @observable
  public actualTime: string | null = null;


  constructor() {
    makeObservable(this)
    this.init()
    setInterval(() => (this.init()), 1000);
    
  }

  @mobx.action
  public init = mobx.flow(function* (this: Weather) {
    const response = yield axios.request(options);
    const date = (new Date()).toISOString().slice(0, 10);
    // @ts-ignore
    const sunsetTimes = Object.assign(...response.data.daily.time.map((n: any, i: string | number) => ({ [n]: response.data.daily.sunset[i] })))
    // @ts-ignore
    const sunriseTimes = Object.assign(...response.data.daily.time.map((n: any, i: string | number) => ({ [n]: response.data.daily.sunrise[i] })))
    
    this.weathercode = response.data.current_weather.weathercode;
    this.sunrise = sunriseTimes[date];
    this.sunset = sunsetTimes[date];
    this.time = response.data.current_weather.time;
    this.actualTime = (new Date()).toLocaleTimeString();
  })
}

export class Devider {
    public nodeType = "devider";
    @observable
    public id: string;

    @observable
    public width: number;

    @observable
    public height: number;

    @observable
    public sections: (Section | Devider)[] = []

    constructor(attrs: IDeviderProps) {
        this.id = id();
        this.height = attrs.height;
        this.width = attrs.width;

        makeObservable(this)
  }
}

class Store {
    @observable
    public selectedSectionId: string | null = null;

    @observable
    public root: Section = new Section({
        id: "root",
        width: 800,
        height: 1000,
        frameSize: 50,
        sections: [
            new Section({
                width: 800 - 50 * 2,
                height: 1000 - 50 * 2
                // frameSize: 50,
                // type: "left"
            })
            ],
    });
  
  @observable
  public weather: Weather = new Weather();
        
  constructor() {
    makeObservable(this)
  }
    private findNested = (sec: Section | Devider, id: string | null): Section | null | undefined | Devider => {
          if (sec.id === id) {
            return sec;
          }
          if (!sec.sections) {
            return null;
          }
          for (let i = 0; i < sec.sections.length; i++) {
            let founded = this.findNested(sec.sections[i], id);
            if (founded) {
              return founded;
            }
          }
    }

    @mobx.computed
        get selectedSection() {
         
        return this.findNested(this.root, this.selectedSectionId);
      }
        
    @mobx.action
    public setSectionType = (type: string): void => {
    if (!this.selectedSection || this.selectedSection instanceof Devider) return;
    this.selectedSection.type = type;
    if (type === "none") {
      this.selectedSection.frameSize = 0;
    } else {
      this.selectedSection.frameSize = this.selectedSection.frameSize || 50;
    }
    }
  
  @mobx.action
  public setSelectedSectionId = (id: string | null): void => {
    this.selectedSectionId = id;
    }

    @mobx.action
  public splitCurrentSection = (direction: string) => {
      const { selectedSection } = this;
      if (!selectedSection || selectedSection instanceof Devider) return;
    selectedSection.splitDirection = direction;

    if (direction === "vertical") {
      selectedSection.sections.push(
        new Section({
          width: selectedSection.width / 2 - DEVIDER_SIZE / 2,
          height: selectedSection.height
        }),
        new Devider({
          width: DEVIDER_SIZE,
          height: selectedSection.height
        }),
        new Section({
          width: selectedSection.width / 2 - DEVIDER_SIZE / 2,
          height: selectedSection.height
        })
      );
    } else {
      selectedSection.sections.push(
        new Section({
          width: selectedSection.width,
          height: selectedSection.height / 2 - DEVIDER_SIZE / 2
        }),
        new Devider({
          width: selectedSection.width,
          height: DEVIDER_SIZE
        }),
        new Section({
          width: selectedSection.width,
          height: selectedSection.height / 2 - DEVIDER_SIZE / 2
        })
      );
    }
    this.selectedSectionId = null;
  }
}

export default Store;