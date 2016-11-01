*   继承有什么作用? （难度:3*）
    *   继承可以使一个对象直接使用另一个对象的属性和方法。
*   有几种常见创建对象的方式? 举例说明? （难度:4*）
    *   有4中常见的创建对象方式：普通模式、工厂模式、构造函数模式、原型模式。  
        1普通模式

            Plople = {
              name： ‘yangran',
              sex: 'male',
              sayName: function(){
                 console.log('My name is:' + this.name);
              }
            }

        2工厂模式

            function Plople(name, sex){
              var obj = {};
              obj.name = name;
              obj.sex = sex;
              obj.sayName = function(){
                 console.log('My name is:' + this.name);   
              }
              return obj;
            } 
            var p1 = Plople('yangran1', 'male');
            var p2 = Plople('yangran2', 'male');

        3构造函数模式

            function Plople(name, sex){
              this.name = name;
              this.sex = sex;
              this.sayName = function(){
                console.log('My name is:' + this.name);
              }
            }  
            var p1 = new Plople('yangran1', 'male');
            var p2 = new Plople('yangran2', 'male');

        4原型模式

            function Plople(name, sex){
            this.name = name;
            this.sex = sex;
            }
            Plople.prototype.sayName = function(){
            console.log('My name is:' + this.name);
            }
            var p1 = new Plople('yangran1', 'male');
            var p2 = new Plople('yangran2', 'male');

*   下面两种写法有什么区别? （难度:3*）

        //方法1
        function People(name, sex){
         this.name = name;
         this.sex = sex;
         this.printName = function(){
             console.log(this.name);
         }
        }
        var p1 = new People('饥人谷', 2)

        //方法2
        function Person(name, sex){
         this.name = name;
         this.sex = sex;
        }
        Person.prototype.printName = function(){
         console.log(this.name);
        }
        var p1 = new Person('若愚', 27);

    *   创建对象的模式不同：方法1为构造函数模式，方法2为原型模式；
    *   printName对象方法的定义方式不同：  
        方法1的printName方法定义在构造函数内部，属于构造函数特有的；  
        方法2的printName方法定义在构造函数的原型(prototype)上，可以被new Person()所创建的实例对象共享。
*   Object.create有什么作用？兼容性如何？如何使用？ （难度:3*）
    *   Object.create()方法创建一个拥有指定原型和若干个指定属性的对象。Object.create(proto,[ propertiesObject ]),第一个参数作为所创建对象的原型，第二个参数是一组属性与值为所创建对象的属性与值。  

        <div class="image-package">![](http://upload-images.jianshu.io/upload_images/2155778-acfaad8c4b83e4e2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  

        <div class="image-caption">浏览器兼容性</div>

        </div>

            function Person(name, age){
              this.name = name;
              this.age = age;
            }
            Person.prototype.sayName = function(){
              console.log('My name is:' + this.name);
            }
            function Male(sex){
             this.sex = sex;
             Person.call(this, name, age);//在Male实例对象下
            }
            //Male.prototype = Person.prototype;//方法1但会使Person也具备了Male的方法,不推荐
            Male.prototype = Object.create(Person.prototype);//创建一个空对象使Person.prototype为Male.prototype的原型，Male.prototype.__proto__ === Person.prototype为true
            Male.constructor = Male;//创建的新对象constructor指向为Object，这里进行指向更改
            Male.prototype.sayAge = function(){//给创建的新对象里添加方法
             console.log('age:' + this.sex);
            }
            //Male.prototype = new Person//方法3兼容环境

    *   Object.create方法的封装

            function inherit(superType, subType){
              var _prototype  = Object.create(superType.prototype);
              _prototype.constructor = subType;
              subType.prototype = _prototype;
            }//superType为需要被继承方法的对象，subType为需要去继承方法的对象
            inherit(Person, Male);

*   hasOwnProperty有什么作用？ 如何使用？ （难度:3*）

    *   hasOwnPerperty是Object.prototype的一个方法，可以判断一个对象是否包含自定义属性而不是原型链上的属性。

            var Obj = {
            name: name,
            sayName:function(){
                console.log(this.name)
              }
            }
            Obj.hasOwnProperty('sayName')//true
            Obj.hasOwnProperty('toString')//false
            Obj.hasOwnProperty('name')//true

        <div class="image-package">![](http://upload-images.jianshu.io/upload_images/2155778-ba180dcebf33b799.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  

        <div class="image-caption">hasOwnProperty</div>

        </div>

        在上例中可以看出，sayName方法与name属性都是Obj本身自带的属性hasOwnProperty判断为true，而toString方法是继承于原型链上Object对象上的方法hasOwnProperty判断为false。  

        <div class="image-package">![](http://upload-images.jianshu.io/upload_images/2155778-2609efb6d1c50530.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  
        </div>

*   实现Object.create的 polyfill，如:（ps: 写个 函数create，实现 Object.create 的功能) （难度:4*）

        var obj = {a: 1, b:2};
        var obj2 = create(obj);
        function create(obj){
        if(typeof Object.create === 'function'){
         return Object.create(obj);
        } else {
         function fn(){}
         fn.prototype = obj;
         newObj = new fn();
        }
        return newObj;
        }
        console.log(obj2.a); //1

*   如下代码中call的作用是什么? （难度:4*）

        function Person(name, sex){
         this.name = name;
         this.sex = sex;
        }
        function Male(name, sex, age){
         Person.call(this, name, sex);    //这里的 call 有什么作用
         this.age = age;
        }

    *   这里的 call 表示在Male构造函数的环境下使用Person构造函数下的name、sex属性，也就是在通过new Male()创建的实例对象可以传递name、sex参数，在Male构造函数下创建Person构造函数下的name和sex属性。  

        <div class="image-package">![](http://upload-images.jianshu.io/upload_images/2155778-10a445bd741f26bf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  
        </div>

*   补全代码，实现继承 （难度:4*）

        function Person(name, sex){
         // todo ...
        }
        Person.prototype.getName = function(){
         // todo ...
        };    
        function Male(name, sex, age){
        //todo ...
        }
        //todo ...
        Male.prototype.getAge = function(){
         //todo ...
        };
        var ruoyu = new Male('若愚', '男', 27);
        ruoyu.printName();

        function Person(name, sex){
         this.name = name;
         this.sex = sex;
        }
        Person.prototype.getName = function(){
         console.log(this.name);
        };    
        function Male(name, sex, age){
         Person.call(this, name, sex);
        this.age = age;
        }
        Male.prototype = Object.create(Person.prototype);
        Male.prototype.constructor = Male;
        Male.prototype.getAge = function(){
         console.log(this.age);
        };
        var ruoyu = new Male('若愚', '男', 27);
        ruoyu.getName();

### 代码

*   实现如下dialog 弹窗功能， [参考效果](http://book.jirengu.com/jirengu-inc/js-works/dialog/muti-modal-jquery.html) （难度:*****）

        //功能描述：
        // 1\. 可使用 dialog.open() 去打开弹窗
        // 2\. 当点击确定、取消时可使用用户自定义事件
        // 3\. dialog 可拖动
        // 4\. 允许页面展示多个 dialog
        function Dialog(){
        //todo ...
        }
        var tpl = '<ul><li>列表1</li><li>列表2</li><li>列表1</li><li>列表1</li></ul>';
        $('#open4').on('click',function(){
         var dialog4 = new Dialog();
         dialog4.open({
           title: '欢迎来到饥人谷',
           message: tpl,
           isShowCloseBtn: true,
           isShowConfirmBtn: true,
           onClose: function(){
             alert('close')
           },
           onConfirm: function(){
             alert('确定');
           }
         });
        });

    [代码1](http://book.jirengu.com/jirengu-inc/jrg-vip9/members/%E6%9D%A8%E7%84%B6/%E4%BB%BB%E5%8A%A1%E7%8F%AD%E9%A2%84%E4%B9%A0/%E4%BB%BB%E5%8A%A137/dialog-li1.html)  
    `本博客版权归 本人和饥人谷所有，转载需说明来源`