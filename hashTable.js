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
    }

    set(key,value) {
        const index = hash(key,this.size)
        this.table[index] = value
    }

    get(key) {
        const index = hash(key,this.size)
        return this.table[index]
    }

    display() {
        let count = 0
        while(count<this.size) {
            console.log(count,this.table[count])
            count++
        }
    }
}

const datas = new HashTable(17)
datas.set("name","vimal")
datas.set("age",23)
datas.set('gender',"male")
datas.set("degree","Computer science")
datas.set("amne","kani")

console.log(datas.display())
