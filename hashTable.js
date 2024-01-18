const hash = (str,tableSize) => {
    let hash = 0
    for(let i=0;i<str.length;i++){
        hash += str.charCodeAt(i)
    }
    return hash % tableSize
}


class HashTable {
    constructor(size) {
        this.table = new Array(size)
        this.size = size
        this.numberOfitems = 0
    }
    loadFactor = 0

    set(key,value) {
        const index = hash(key,this.size)
        const bucket = this.table[index]
        if(!bucket){
            this.table[index] = [[key, value]]
            this.numberOfitems++
        }else{
            const sameItem = bucket.find((item) => {
                return item[0] === key
            })
            if(sameItem){
                sameItem[1] = value
            }else{
                bucket.push([key, value])
                this.numberOfitems++
            }
        }
        this.loadFactor = this.numberOfitems / this.size
        if(this.loadFactor > .8){
            this.resize()
        }
    }

    get(key) {
        const index = hash(key,this.size)
        const bucket = this.table[index]
        // console.log(this.table[index][0]); //[["person1", "ram"]]
        if(this.table[index] === undefined) return undefined
        if(this.table[index].length === 1 && key === this.table[index][0][0]){
            return this.table[index][0][1] 
        }else{
            for(const element of bucket){
                if(element[0] === key) return element[1]
            }
            return undefined
        }
    }

    entries() {
        let count = 0
        const entryArr = []
        while(count<this.size) {
            if(this.table[count] !== undefined){
                if(this.table[count].length === 1){
                    entryArr.push(this.table[count][0])
                }else{
                    for(const item of this.table[count]){
                        entryArr.push(item)
                    }
                }
            }
            count++
        }
        return entryArr
    }

    remove(key) {
        const index = hash(key,this.size)
        if(this.table[index] === undefined) return 
        if(this.table[index].length === 1 && key === this.table[index][0][0]){
            this.table[index] = undefined
            this.numberOfitems--
        }
        const bucket = this.table[index]
        if(bucket) {
            const sameItem = bucket.find(item => item[0] === key)
            if(sameItem){
                bucket.splice(bucket.indexOf(sameItem),1)
                this.numberOfitems--
            }
        }
    }

    resize() {

    }

    has(key) {
        const index = hash(key,this.size)
        const bucket = this.table[index]
        if(this.table[index] === undefined) return false
        if(this.table[index].length === 1 && key === this.table[index][0][0]){
            return true 
        }else{
            for(const element of bucket){
                if(element[0] === key) return true
            }
            return false
        }
    }

    length() {
        return this.numberOfitems
    }

    clear() {
        this.table.fill(undefined)
    }

    keys() {
        const keyArr = []
        let count =0
        while(count < this.size){
            if(this.table[count] === undefined) {
                count++
                continue
            }else{
                if(this.table[count].length === 1){
                    keyArr.push(this.table[count][0][0])
                    count++
                    continue
                }else{
                    for(const item of this.table[count]){
                        keyArr.push(item[0])
                    }
                }
            } 
            count++
        }
        return keyArr
    }

    values() {
        const valueArr = []
        let count =0
        while(count < this.size){
            if(this.table[count] === undefined) {
                count++
                continue
            }else{
                if(this.table[count].length === 1){
                    valueArr.push(this.table[count][0][1])
                    count++
                    continue
                }else{
                    for(const item of this.table[count]){
                        valueArr.push(item[1])
                    }
                }
            } 
            count++
        }
        return valueArr
    }
}

const datas = new HashTable(17)
datas.set("name","silco")
datas.set("eman","jace")
datas.set('maen',"herminder")
datas.set("anme","ekko")
datas.set("amne","jinx")
datas.set("person1","Vi")
console.log(datas.entries())
console.log('get', datas.get("eman"));
datas.remove("name")
datas.set("name","vander")

console.log(datas.loadFactor)
console.log(datas.has("name"))
console.log(datas.length())
console.log(datas.keys())
console.log(datas.values())
