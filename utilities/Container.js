import { CompareObject } from "./utils.js";

export default class Container {
    constructor(element, renderFunc) {
        this.data = [];
        this.element = element;
        this._render = renderFunc
    }
    ReplaceData(data = []) {
        this.ClearItem()
        this.AddItem(...data)
        return this
    }
    AddItem(...data) {
        this.data.push(...data)
        return this
    }
    RemoveItem(...items) {
        items.forEach(item => this.data.splice(this.data.findIndex(obj => CompareObject(obj, item)), 1))
        return this
    }
    ClearItem() {
        this.data.length = 0
        return this
    }
    addEvent(event, func) {
        if (event && typeof func == 'function') this.element.addEventListener(event, func.bind(this))
        return this
    }
    Render() {
        this.ReplaceData(this.data.filter(_ => _))
        this.element.innerHTML = ""
        for (const data of this.data) {
            if (!data) continue
            const elem = this._render(data)
            if (elem) this.element.appendChild(elem)
        }
        return this
    }
}

