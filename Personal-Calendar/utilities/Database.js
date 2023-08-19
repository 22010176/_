import { CompareObject, FindDuplicate, FindUnDuplicate, LayDuLieu, LuuDuLieu, deleteObj } from './Utilities.js'

function GenerateID(times = 1) {
    let result = ''
    for (let i = 0; i < times; i++)result += Math.floor(Math.random() * 1e17).toString(32)
    return result
}

export default class Database {
    static _database = {}
    static _data = []
    static _connection = []
    static _id = []
    static Load(...exclude) {
        this._data.push(...(LayDuLieu('data') || []))
        this._connection.push(...(LayDuLieu('connection') || []))
        this._id.push(...(LayDuLieu('id') || []))
        this._data.forEach(data => {
            if (exclude.includes(data.name)) return data.deleted = true
            if (!this._database[data.name]) this._database[data.name] = []
            this._database[data.name].push(data)
        })
    }
    static Save() {
        LuuDuLieu("data", this._data)
        LuuDuLieu("connection", this._connection)
        LuuDuLieu("id", this._id)
    }
    static FindItem({ data: dat = {}, ...obj }) { return this._database[obj.name].filter(data => CompareObject(dat, data.data, Object.keys(dat))) }
    static CreateConnection(from, to) {
        if (!(from && to) || this._connection.find(connect => connect.from == from.id && connect.to == to.id)) return
        this._connection.push({ from: from.id, to: to?.id })
    }
    static FindAllConnectFrom({ id }) { return this._connection.filter(({ from, to }) => from == id) }
    static FindAllConnectTo({ id }) { return this._connection.filter(({ from, to }) => to == id) }
    static FindById(id) { return this._database.find(data => data.id == id) }

    _InitFun(data) { return data }
    constructor(name, checkID = [], initFunc = this._InitFun) {
        this.name = name
        this.checkID = checkID
        this.initFunc = initFunc
        Database._database[this.name] ??= []
    }
    get _() { return Database._database[this.name].filter(data => !data.deleted) }
    set _(data) { Database._database[this.name] = data }
    Add(...items) {
        const undup = []
        const data = items.map(data => {
            const item = this.GetOne(data)
            if (item) return item
            let id; do id = GenerateID(2); while (Database._id.includes(id))
            Database._id.push(id)
            const result = { id, name: this.name, custom: {} }
            Object.assign(result, { data: this.initFunc(data) })
            undup.push(result)
            return result
        }).filter(_ => _)
        Database._data.push(...undup)
        Database._database[this.name].push(...undup)
        return data
    }
    Remove(obj = {}, num) {

        this._.forEach(data => {
            if (!CompareObject(obj, data.data, Object.keys(obj)) || num-- <= 0) return 1
            data.deleted = true
        })
        return this;
    }
    Get(obj = {}) { return this._.filter(data => CompareObject(data.data, obj, Object.keys(obj))) }
    GetOne(obj = {}) { return this._.find(data => CompareObject(data.data, obj, Object.keys(obj))) }
    GetById(id) { return this._.find(data => data.id == id) }
}

function Testing() {
    Database.Load()

    const a = new Database("test")
    const b = new Database("test2")

    // a.Add({ d: 34 })
    // b.Add({ c: 222 })
    // Database.CreateConnection(a.GetOne({ d: 34 }), b.GetOne({ c: 222 }))
    // console.log(Database._database)
    console.log(a._)
    // Database.Save()
}
// Testing()