class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

class HashMap {
    array = new Array(16);

    hash(key) {
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.array.length;
        }

        return hashCode;
    }

    set(key, value) {
        let index = this.hash(key)
        if (this.array[index] && this.array[index] instanceof Node) {
            let currentNode = this.array[index];
            // overwrite value if a key exists
            if (currentNode.key === key) {
                currentNode.value = value;
                return
            }
            // find LL tail
            while (currentNode.next) {
                currentNode = currentNode.next;
            }
            currentNode.next = new Node(key, value)
        } else {
            this.array[index] = new Node(key, value)
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
                        previousNode = currentNode.next;
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

let hashMap = new HashMap()
hashMap.set('john','smith')
hashMap.set('john', 'smith')
hashMap.set('john', 'smith')
hashMap.set('john', 'smith')
hashMap.set('joe', 'smith')
console.log(hashMap.array)
console.log(hashMap.get('john'))
console.log(hashMap.has('john'))
// hashMap.remove('john');
console.log(hashMap.array)
console.log(hashMap.length());
// hashMap.clear()
console.log(hashMap.array)
console.log(hashMap.values())
console.log(hashMap.entries())