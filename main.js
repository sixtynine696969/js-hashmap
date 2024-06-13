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
}

let hashMap = new HashMap()
hashMap.set('nigger','jew')
hashMap.set('nigger', 'jew')
hashMap.set('nigger', 'jew')
hashMap.set('nigger', 'jew')
hashMap.set('nigger', 'penis')
console.log(hashMap.array)
console.log(hashMap.get('nigger'))
console.log(hashMap.has('nigger'))
hashMap.remove('nigger');
console.log(hashMap.array)