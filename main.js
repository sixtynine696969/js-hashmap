class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

class HashMap {
    array = new Array(16);
    loadFacotor = 0.75;

    hash(key) {
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.array.length;
        }

        return hashCode;
    }

    resize() {
        let entries = this.entries()
        this.array = new Array(this.array.length * 2);
        for (const item of entries) {
            this.set(item[0], item[1])
        }
    }

    set(key, value) {
        let index = this.hash(key)
        if (this.array[index] && this.array[index] instanceof Node) {
            let currentNode = this.array[index];
            while (currentNode) {
                // overwrite value if a key exists
                if (currentNode.key === key) {
                    currentNode.value = value;
                    return;
                }

                // find LL tail
                if (currentNode.next === null) break;
                currentNode = currentNode.next;
            }
            currentNode.next = new Node(key, value);
        } else {
            this.array[index] = new Node(key, value);
        }

        // resize array
        if (this.length() / this.array.length > this.loadFacotor) {
            this.resize();
        }
    }

    get(key) {
        let index = this.hash(key);
        if (this.array[index] && this.array[index] instanceof Node) {
            let currentNode = this.array[index];
            while (currentNode) {
                if (currentNode.key === key) return currentNode.value;
                currentNode = currentNode.next;
            }
        }
        return null;
    }

    has(key) {
        let index = this.hash(key);
        if (this.array[index] && this.array[index] instanceof Node) {
            let currentNode = this.array[index];
            while (currentNode) {
                if (currentNode.key === key) return true;
                currentNode = currentNode.next;
            }
        }
        return false;
    }

    remove(key) {
        let index = this.hash(key);
        let bucket = this.array[index];
        if (bucket && bucket instanceof Node) {
            let currentNode, previousNode = currentNode = bucket;
            while (currentNode) {
                if (currentNode.key === key) {
                    if (previousNode === currentNode) {
                        delete this.array[index];
                    }
                    else if (currentNode.next) {
                        previousNode.next = currentNode.next;
                    } else {
                        previousNode.next = null;
                    }
                    return true;
                }
                previousNode = currentNode;
                currentNode = currentNode.next;
            }
        }
        return false;
    }

    length() {
        let numberOfKeys = 0;
        for (let i = 0; i < this.array.length; i++) {
            let bucket = this.array[i]
            if (bucket && bucket instanceof Node) {
                let currentNode = bucket;
                while (currentNode) {
                    numberOfKeys += 1;
                    currentNode = currentNode.next;
                }
            }
        }
        return numberOfKeys;
    }

    clear() {
        // this.array = new Array(this.array.length)
        for (let i = 0; i < this.array.length; i++) {
            delete this.array[i];
        }
    }

    keys() {
        let keys = [];
        for (let i = 0; i < this.array.length; i++) {
            let bucket = this.array[i]
            if (bucket && bucket instanceof Node) {
                let currentNode = bucket;
                while (currentNode) {
                    keys.push(currentNode.key);
                    currentNode = currentNode.next;
                }
            }
        }
        return keys;
    }

    values() {
        let values = [];
        for (let i = 0; i < this.array.length; i++) {
            let bucket = this.array[i]
            if (bucket && bucket instanceof Node) {
                let currentNode = bucket;
                while (currentNode) {
                    values.push(currentNode.value);
                    currentNode = currentNode.next;
                }
            }
        }
        return values;
    }

    entries() {
        let entries = [];
        for (let i = 0; i < this.array.length; i++) {
            let bucket = this.array[i]
            if (bucket && bucket instanceof Node) {
                let currentNode = bucket;
                while (currentNode) {
                    entries.push([currentNode.key, currentNode.value]);
                    currentNode = currentNode.next;
                }
            }
        }
        return entries;
    }
}

// Tests
let hashMap = new HashMap()
hashMap.set('john','smith')
hashMap.set('john', 'smith')
hashMap.set('john', 'doe')
console.log(hashMap.array)
console.log(hashMap.get('john'))
console.log(hashMap.has('john'))
hashMap.remove('john');
console.log(hashMap.array)
console.log(hashMap.length());
for (let i = 0; i < 65; i++) {
    hashMap.set(`${i}`, 'smith')
}
console.log(hashMap.array)
console.log(hashMap.length())
console.log(hashMap.keys().length)
console.log(hashMap.array.length)

// Odin tests
let padding = '';
for (let i = 0; i < 20; i++) {
    padding += '-';
}
console.log(`${padding} ODIN TESTS ${padding}`);

const test = new HashMap() // or HashMap() if using a factory
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
console.log(test.length() / test.array.length)
console.log(test.length())

test.set('lion', 'brown')
test.set('kite', 'aqua')
console.log(test.length())

test.set('moon', 'silver')
console.log(test.length() / test.array.length)
console.log(test.length())
test.set('hat', 'bubble')
test.set('dog', 'husky')
test.length()

console.log(test.get('apple'))
console.log(test.has('dog'))
console.log(test.remove('lion'))
console.log(test.length())
console.log(test.entries())
console.log(test.keys())
console.log(test.values())
test.clear()
console.log(test.length())