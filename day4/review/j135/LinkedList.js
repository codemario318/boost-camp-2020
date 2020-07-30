function LinkedList() {
    this.length = 0;
    this.head = null;
  }
  
  // add : node 하나를 리스트 맨 뒤에 추가한다
  LinkedList.prototype.add = function (node) {
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.length++;
  };
  
  // insert : position 위치에 node를 추가한다
  // position이 리스트의 길이보다 크거나 같으면 맨 뒤에 추가한다 (add)
  LinkedList.prototype.insert = function (node, position) {
    if (position >= this.length) {
      this.add(node);
      return;
    }
  
    if (position === 0) {
      node.next = this.head;
      this.head = node;
      this.length++;
      return;
    }
  
    let current = this.head;
    let next = current.next;
    for (let i = 0; i < position - 1; i++) {
      current = current.next;
      next = next.next;
    }
    current.next = node;
    node.next = next;
    this.length++;
  };
  
  // delete : 입력받은 id를 가지고 있는 node 하나를 제거한다.
  // 중복된 노드가 존재할 수 있고, 그 경우 가장 앞의 node가 제거된다.
  LinkedList.prototype.delete = function (id) {
    let prev = null;
    let current = this.head;
  
    while (current && current.id !== id) {
      prev = current;
      current = current.next;
    }
  
    if (!current) {
      return;
    }
  
    if (prev) {
      prev.next = current.next;
    } else {
      this.head = current.next;
    }
  
    this.length--;
  };
  
  // 현재 리스트 정보를 콘솔에 출력한다
  LinkedList.prototype.print = function () {
    let output = '|';
    let current = this.head;
  
    while (current) {
      output += `---[${current.id}, ${current.playTime}sec]`;
      current = current.next;
    }
  
    output += '---[end]';
    console.log(output);
  };
  
  // 리스트를 탐색하면서 리스트의 길이와 전체 재생시간을 출력한다
  LinkedList.prototype.render = function () {
    let totalTime = 0;
    let current = this.head;
  
    while (current) {
      totalTime += current.playTime;
      current = current.next;
    }
    console.log(`영상클립: ${this.length}개`);
    console.log(`전체길이: ${totalTime}sec`);
  };
  
  module.exports = LinkedList;