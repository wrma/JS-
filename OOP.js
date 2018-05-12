/*
* @Author: wrma
* @Date:   2018-03-17 09:56:51
* @Last Modified by:   wrma
* @Last Modified time: 2018-05-10 09:41:44
*/

/* ********************
   数据属性和访问器属性
 ********************* */

//数据属性
//[[Configurabale]],[[Enumerable]],[[Writable]],[[Value]]
var o = {
    name : 'wrma'
}
Object.defineProperty(o,'age',{
    writable : false, //设置属性为不可写
    value : 20
})
console.log(o.age); //20
o.age = 21;
console.log(o.age); //20

//访问器属性（不包含数据值）
//[[Configurabale]],[[Enumerable]],[[Get]],[[Set]]
//[[Get]]是获取属性时访问的特性，[[Set]]是修改属性时访问的特性
var o = {
    name : 'wrma',
    _age : 20
};
//age是访问器属性，name及_age都是数据属性
Object.defineProperty(o,'age',{
    get : function (){
        return this._age
        //如果这里写成了return this.age 那么就会不停地调用get方法，陷入死循环
    },
    set : function (newValue) {
        this._age = newValue + 1;
    }
});
o.age=21;
console.log(o._age); //22
console.log(o.age); //22


/* ********************
        创建对象
 ********************* */
 //对象字面量
 var a = {
    name : 'wrma',
    age : '20'
 }
 /*
缺点：当我们需要创建100个这样的对象的时候就要重复书写这样的对象字面量100次，十分不容易
 */

//工厂模式
function createPerson(name,age) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.sayName = function () {
        console.log(this.name);
    };
    return o;
}
var person1 = createPerson('wrma',20);
var person2 = createPerson('daemon',23);
person1.sayName(); //wrma
person2.sayName(); //deamon

//缺点：虽然创建了多个对象，但是无法知道他们的类型


//构造函数模式
function Person(name,age) {
    this.name = name;
    this.age = age;
    this.sayName = function () {
        console.log(this.name);
    }
}
var person1 = new Person('wrma',20);
var person2 = new Person('daemon',23);
person1.sayName(); //wrma
person2.sayName(); //deamon

console.log(person1 instanceof Person); //true
console.log(person2 instanceof Person); //true
console.log(person1.sayName === person2.sayName); //false，不同实例上的同名函数不等，他们占用的是两块不同的内存

//优点：可以将实例识别为某一特定的类型
/*
缺点：当构造函数中有方法时，就要为每一个实例重新创建一遍，如上面的sayName
    等同于 this.sayName = new Function(...);
    这时，虽然person1和person2的sayName实现的是相同的逻辑，但是却创建了两个Function实例，他们是占用了两块内存的
    当我们需要一次性创建多个实例时，占用的内存就会多起来导致性能下降
*/


//原型模式
function Person() {
    
}
//当我们用对象字面量写prototype时，相当于重写了Person的原型对象，所以要手动给他加上constructor，不然constructor就会指向Object
//Person.prototype.name = 'wrma',这种形式就相当于往原型对象上添加属性,constructor指向的还是Person
Person.prototype = {
    //constructor : Person,
    name : 'wrma',
    age : 20,
    sayName : function () {
        console.log(this.name);
    }
}
//手动加上的constructor，enumerable会被设置为true,我们需要人为修改一下
Object.defineProperty(Person,'constructor',{
    enumerable: false,
    value : Person
})
var person1 = new Person();
var person2 = new Person();

console.log(person1.sayName === person2.sayName); //true，现在sayName指向的就是同一块内存了

//实例上的同名属性会覆盖原型对象上的属性
person1.sayName = function () {
    console.log('others')
}
console.log(person1.sayName()); //others
console.log(person1.sayName === person2.sayName); //false

//优点：不用为每个实例的方法都开辟一块内存空间，现在他们共享同一片内存空间了
//缺点：对于包含引用类型值的属性，修改实例上的值会同时修改到原型对象上
//eg：
Person.prototype.like = ['apple','banana'];
person1.like.push('pear');
console.log(person1.like); //['apple','banana','pear']
console.log(person2.like); //['apple','banana','pear']



//组合使用原型模式和构造模式
function Person(name,age,like) {
    this.name = name;
    this.age = age;
    this.like = like;
}
Person.prototype.sayName = function () {
    console.log(this.name);
}
var person1 = new Person('wrma',20,['apple','banana']);
var person2 = new Person('daemon',23,['apple','banana']);

console.log(person1 instanceof Person); //true
console.log(person2 instanceof Person); //true
console.log(person1.sayName === person2.sayName); //true
person1.like.push('pear');
console.log(person1.like); //['apple','banana','pear']
console.log(person2.like); //['apple','banana']


/*---------------------
        继承
 ---------------------*/
//原型链实现继承
function Parent(){
    this.parent = 'parent';
    this.like = ['apple','banana'];
}
function Child() {
    this.child = 'child';
}
Parent.prototype.getParent = function () {
    return this.parent;
}
Child.prototype = new Parent(); //这里让Child的原型对象指向Parent的实例
//注意，往子类原型上添加属性或方法时一定要放在替换原型的语句之后
Child.prototype.getChild = function () {
    return this.child;
}
var child = new Child();

console.log(child.__proto__ === Child.prototype); //true
console.log(Child.prototype.__proto__ === Parent.prototype); //true
console.log(child.__proto__.constructor === Parent); //true
console.log(child instanceof Child); //true
console.log(child instanceof Parent); //true
console.log(child instanceof Object); //true

console.log(child.getParent()); //parent 快看呀，这就是继承！
//1)搜索实例 2)搜索Child.prototype 3)搜索Parent.prototype
//这就是基于原型链查找的继承

console.log(child.parent); //parent
//由于Child.prototype指向的是Parent的实例,这里访问的实际上是Child.prototype.parent
//我们访问到的依旧是原型链上的属性,由于原型链上的属性是共享的，那么问题就又出来了
var child2 = new Child();
child.like.push('pear');
console.log(child.like);  //['apple','banana','pear']
console.log(child2.like); //['apple','banana','pear']
//由于原型链上的实例是共享的，我们修改一个实例的属性，就会影响到其他实例

/*
缺点: 1.由于原型链上的属性和方法都是共享的，当属性值为引用类型值时问题就出现了
     2.在创建子类实例时，不能向父类的构造函数中传递参数
*/


//构造函数法实现继承
function Parent(name) {
    this.name = name;
    this.like = ['apple','banana'];
}
function Child() {
    //调用父类的构造函数并修正this指向
    //使用构造函数还可以向里面传递参数
    Parent.call(this,'wrma');
}
var child = new Child();
var child2 = new Child();

console.log(child.name); //wrma
console.log(child.like); //['apple','banana']

child.like.push('pear');
console.log(child.like); //['apple','banana','pear']
console.log(child2.like); //['apple','banana']

//同样这种方法也存在缺陷，即当构造函数中定义方法时，每实例化一个对象就会为他分配一块内存空间


//组合继承
function Parent(name) {
    this.name = name;
    this.like = ['apple','banana'];
}
function Child(name,age) {
    Parent.call(this,name); //像es6里面的super()
    this.age = age;
}
Parent.prototype.sayName = function () {
    console.log(this.name);
}
Child.prototype = new Parent();
Child.prototype.constructor = Child;

Child.prototype.sayAge = function () {
    console.log(this.age);
}
var child = new Child('wrma',20);
var child2 = new Child('daemon',23);

console.log(child.name); //wrma
console.log(child.sayName()); //wrma
console.log(child.sayAge()); //20
console.log(child.like); //['apple','banana']

child.like.push('pear');
console.log(child.like); //['apple','banana','pear']
console.log(child2.like); //['apple','banana']
/*
缺点：我们在利用 Child.prototype = new Parent();这句的时候其实又实例化了一次 Parent，但是实际上，这样的实例化是并不需要的
    因为在Parent.call(this,name);的时候,父类 constructor里面的属性就已经被绑定到 Child里面了，不需要再实例化绑定一次
*/



//组合继承的优化1
function Parent(name) {
    this.name = name;
    this.like = ['apple','banana'];
}
function Child(name,age) {
    Parent.call(this,name);
    this.age = age;
}
Parent.prototype.sayName = function () {
    console.log(this.name);
}
Child.prototype = Parent.prototype; //我们这里直接将 Child.prototype指向 Parent.prototype,可以避免Parent的这一次实例化
Child.prototype.constructor = Child; //修正constructor的指向
Child.prototype.sayAge = function () {
    console.log(this.age);
}
var child = new Child('wrma',20);
Child.prototype.constructor === Parent //true
/*
缺点：Child.prototype.constructor === Child //true
    Parent.prototype.constructor === Child //true;
    这里我们在修正constructor指向的时候由于Child.prototype = Parent.prototype;
    所以 Parent的构造函数也会指向 Child
*/


//组合继承的优化2
function Parent(name) {
    this.name = name;
    this.like = ['apple','banana'];
}
function Child(name,age) {
    Parent.call(this,name);
    this.age = age;
}
Parent.prototype.sayName = function () {
    console.log(this.name);
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

Child.prototype.sayAge = function () {
    console.log(this.age);
}
var child = new Child('wrma',20);