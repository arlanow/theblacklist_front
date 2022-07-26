import Unit from "../models/UnitModel";

class UnitsService  {
    posts = [
        {title: 'Wube Software', id: 0, type: 'company', subtitle: 'Компания', description: 'Разработчик видеоигр (Factorio)'},
        {title: 'Canva', id: 1, type: 'company', subtitle: 'Компания', description: 'Графическое ПО'},
        {title: 'MainCast', id: 2, type: 'blogger', subtitle: 'Twitch, Youtube', description: 'Студия комментирования игр по Dota2, CounterStrike'}
    ]
    getAll = () => {
        return this.posts;
    };
    addUnit = (unit:Unit) => {
        console.log(unit)
        this.posts.push(unit);
    }
    getUnit = (id:number):{title:string} => {
        let result = this.posts.filter((post)=>{ return (post.id === id) })
        if (result.length===0) return {title: 'NotFound'}
        else return result.at(0) as {title:string};
    }
    getFiltered = (filter?:string) => {
        if (filter === undefined) return this.posts;
        return this.posts.filter((post)=>{
            return (post.type === filter)
        })
    };
}

export default UnitsService;