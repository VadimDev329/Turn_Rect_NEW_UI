System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Graphics, Node, Rect, Label, resources, Sprite, SpriteFrame, Vec3, EventTarget, math, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, eventTarget, ccclass, property, Game;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Graphics = _cc.Graphics;
      Node = _cc.Node;
      Rect = _cc.Rect;
      Label = _cc.Label;
      resources = _cc.resources;
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
      Vec3 = _cc.Vec3;
      EventTarget = _cc.EventTarget;
      math = _cc.math;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "bf108Zkyt9JPJFdhP2bufa0", "Game_Turn4", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Graphics', 'Node', 'Rect', 'rect', 'JsonAsset', 'Scheduler', 'Label', 'resources', 'Sprite', 'SpriteFrame', 'Vec2', 'Vec3', 'EventTarget', 'Event', 'Input', 'input', 'math']);

      eventTarget = new EventTarget();
      ({
        ccclass,
        property
      } = _decorator);

      _export("Game", Game = (_dec = ccclass('Game'), _dec2 = property({
        type: Label
      }), _dec3 = property({
        type: Label
      }), _dec4 = property({
        type: Label
      }), _dec(_class = (_class2 = class Game extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "scoreX", _descriptor, this);

          // Для вывода
          _initializerDefineProperty(this, "timer", _descriptor2, this);

          // Для вывода текста "Game Over"
          _initializerDefineProperty(this, "game_state", _descriptor3, this);

          // Для вывода текста "Game Over"
          this.dataS = [];
          this.row = 6;
          // Количество строк сетки                
          this.col = 6;
          // Количество колонок сетки
          // private height: number = 0; // Высота прямоугольника
          // private width: number = 0; //  Ширина прямоугольника
          // private sprite: Sprite[][] = []; // Пазлы/Прямоугольники
          this.angle = [];
          // Углы на которые повёрнуты соответсвующие прямоугольники
          // private grid_pos: Vec3[][] = []; // Сетка конечных позиций Пазлов/Прямоугольников
          this.url = "images/";
          // Адрес "картинок"
          this.count = 80;
          // Таймер
          this.score = 0;
          // this.col * this.row;
          this.s = "id = 10";
        }

        onLoad() {
          //----------------------------------------------------------------------------------------------------------------
          resources.load('images/110/spriteFrame', SpriteFrame, (err, image) => {
            if (err) {
              console.log(err);
            }

            this.cut_out4(image); //  console.log(this.node);
          });
          this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this); // Регистрация события "родителя" this.node
        }

        start() {}
        /* private row: number = 6; // Количество строк сетки                
        private col: number = 6; // Количество колонок сетки
        private height: number = 80; // Высота прямоугольника
        private width: number = 80; //  Ширина прямоугольника */


        cut_out(sprf, sprite, row, col) {
          var height_rect = sprf.originalSize.height / col;
          var width_rect = sprf.originalSize.width / row;
          var spr = new SpriteFrame();

          for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
              spr = sprf.clone();
              spr.rect = new Rect(j * width_rect, i * height_rect, width_rect, height_rect);
              sprite[i] = [];
              sprite[i][j] = new Node("New Sprite").addComponent(Sprite);
              this.node.addChild(sprite[i][j].node);
              sprite[i][j].spriteFrame = spr;
              sprite[i][j].addComponent("TouchDragger");
            }
          }
        }

        cut_out2(sprf) {
          var height_image = sprf.originalSize.height;
          var width_image = sprf.originalSize.width;
          var height_rect = height_image / this.col;
          var width_rect = width_image / this.row;
          var x = 0;
          var y = 0;
          var m = 0; // Математический результат (random)

          var spr = new SpriteFrame();
          var sprite2 = null;

          for (var i = 0; i < this.row; i++) {
            for (var j = 0; j < this.col; j++) {
              spr = sprf.clone();
              spr.rect = new Rect(j * width_rect, i * height_rect, width_rect, height_rect);
              sprite2 = new Node("Sprite" + String(i * j)).addComponent(Sprite);
              this.node.addChild(sprite2.node);
              sprite2.spriteFrame = spr; //----------------Position----------------------------------------------

              y = height_rect * i - height_image / 2 + height_rect / 2;
              x = width_rect * j - width_image / 2 + width_rect / 2;
              sprite2.node.setPosition(x, y * -1, 0); //-----------------------------------------------------------------------
              //-----------------Angle-------------------------------------------------

              m = math.randomRangeInt(0, 360); // Случайное число в диапазоне 0 - 360(целые числа)

              if (m > 0 && m <= 90) m = 90; // Выбор одного из 4 значений

              if (m > 90 && m <= 180) m = 180;
              if (m > 180 && m <= 270) m = 270;
              if (m > 270 && m <= 360) m = 0;
              this.angle[i] = [];
              this.angle[i][j] = m; // Запись в массив 

              sprite2.node.setRotationFromEuler(0, 0, m); // Поворот "piece"
              //------------------Event------------------------------------------------

              sprite2.node.on(Node.EventType.TOUCH_START, event => {}, this); // // Регистрация события "детей"
              //-----------------------------------------------------------------------
              // sprite2.addComponent("TouchDragger");
            }
          } // console.log('this.node.children[0].angle = '+this.node.children[0].angle);       

        }

        cut_out3(sprf) {
          var height_image = sprf.originalSize.height;
          var width_image = sprf.originalSize.width;
          var height_rect = height_image / this.col;
          var width_rect = width_image / this.row;
          var x = 0;
          var y = 0;
          var m = 0; // Математический результат (random)

          var id = 0;
          var spr = new SpriteFrame();
          var sprite2 = null;

          for (var i = 0; i < this.row; i++) {
            for (var j = 0; j < this.col; j++) {
              spr = sprf.clone();
              spr.rect = new Rect(j * width_rect, i * height_rect, width_rect, height_rect);
              sprite2 = new Node("Sprite" + String(i * j)).addComponent(Sprite);
              this.node.addChild(sprite2.node);
              sprite2.spriteFrame = spr; //----------------Position----------------------------------------------

              y = height_rect * i - height_image / 2 + height_rect / 2;
              x = width_rect * j - width_image / 2 + width_rect / 2;
              sprite2.node.setPosition(x, y * -1, 0); //-----------------------------------------------------------------------
              //-----------------Angle-------------------------------------------------

              m = math.randomRangeInt(0, 360); // Случайное число в диапазоне 0 - 360(целые числа)

              if (m > 0 && m <= 90) m = 90; // Выбор одного из 4 значений

              if (m > 90 && m <= 180) m = 180;
              if (m > 180 && m <= 270) m = 270;
              if (m > 270 && m <= 360) m = 0;
              sprite2.node.setRotationFromEuler(0, 0, m); // Поворот "piece"
              //-------------------------------------------------------------------------
              //-----------------Data----------------------------------------------------

              this.dataS[0] = [];
              this.dataS[0][0] = {
                id: '',
                grid_pos: new Vec3(0, 0, 0),
                angle: 0,
                pos: new Vec3(0, 0, 0)
              };
              this.dataS[0][0].id = String(id++);
              this.dataS[0][0].grid_pos.set(j, i);
              this.dataS[0][0].angle = m;
              this.dataS[0][0].pos.set(x, y);
              console.log(this.dataS[0][0]); // this.angle[i] = [];
              // this.angle[i][j] = m; // Запись в массив 
              //------------------Event------------------------------------------------

              sprite2.node.on(Node.EventType.TOUCH_START, event => {}, this); // // Регистрация события "детей"
              //-----------------------------------------------------------------------
              // sprite2.addComponent("TouchDragger");
            }
          } // console.log('this.node.children[0].angle = '+this.node.children[0].angle);       

        }

        cut_out4(sprf) {
          var height_image = sprf.originalSize.height;
          var width_image = sprf.originalSize.width;
          var height_rect = height_image / this.col;
          var width_rect = width_image / this.row;
          var x = 0;
          var y = 0;
          var m = 0; // Математический результат (random)

          var id = 0;
          var spr = new SpriteFrame();
          var sprite2 = null;

          for (var i = 0; i < this.row; i++) {
            for (var j = 0; j < this.col; j++) {
              spr = sprf.clone();
              spr.rect = new Rect(j * width_rect, i * height_rect, width_rect, height_rect);
              sprite2 = new Node("Sprite" + String(i * j)).addComponent(Sprite);
              this.node.addChild(sprite2.node);
              sprite2.spriteFrame = spr; //----------------Position----------------------------------------------

              y = height_rect * i - height_image / 2 + height_rect / 2;
              x = width_rect * j - width_image / 2 + width_rect / 2;
              sprite2.node.setPosition(x, y * -1, 0); //-----------------------------------------------------------------------
              //-----------------Angle-------------------------------------------------

              m = math.randomRangeInt(0, 360); // Случайное число в диапазоне 0 - 360(целые числа)

              if (m > 0 && m <= 90) m = 90; // Выбор одного из 4 значений

              if (m > 90 && m <= 180) m = 180;
              if (m > 180 && m <= 270) m = 270;
              if (m > 270 && m <= 360) m = 0;
              sprite2.node.setRotationFromEuler(0, 0, m); // Поворот "piece"
              //-------------------------------------------------------------------------
              //-----------------Data----------------------------------------------------

              sprite2.node.name = String(x) + " " + String(y) + " " + String(m);
              console.log('sprite2.node.name = ' + sprite2.node.name); //------------------Event------------------------------------------------

              sprite2.node.on(Node.EventType.TOUCH_START, event => {}, this); // // Регистрация события "детей"
              //-----------------------------------------------------------------------
              // sprite2.addComponent("TouchDragger");
            }
          } // console.log('this.node.children[0].angle = '+this.node.children[0].angle);       

        }

        draw_grid(row, col, height, width) {
          // Нарисовать сетку
          //строка,      колонка,     высота,         ширина        
          var x = 0;
          var y = 0;
          var g = this.getComponent(Graphics);
          g.lineWidth = 3;

          for (var i = 0; i < row + 1; i++) {
            // Вертикальные линии
            g.moveTo(0, y);
            g.lineTo(width * col, y);
            y = y + height;
          }

          x = 0;
          y = 0;

          for (var _i = 0; _i < col + 1; _i++) {
            // Горизонтальные линии
            g.moveTo(x, 0);
            g.lineTo(x, height * row);
            x = x + width;
          }

          g.stroke();
        }

        onTouchStart(event) {
          // Обработка события (клик по целевой ноде)
          // event.propagationStopped = true; // Остановка распространения события.
          // event.preventSwallow = true; // "События проникающие в сиситему"
          // let name:number = Number(event.target.name); // Имя(номер по порядку)"piece"
          // this.angle[name] = this.angle[name] + 90; // Против часовой стрелки
          // if(this.angle[name] == 360) this.angle[name] = 0; // 360 = 0;
          // this.sprite[name].node.setRotationFromEuler(0,0,this.angle[name]); // Поворот "piece"
          //let angle:
          //----------------------------------------------------------------------------------------

          /* this.node.name = "300.66998 29298 2374230.43";
          console.log(this.node);
          console.log(this.s);
          var str = "50ml+$100";
          var a = str.split('+')[0]; // 50ml
          var b = str.split('+')[1]; // $100 
            console.log(a);
          console.log(b);
          
          a = this.node.name.split(' ')[0]; // 50ml
          b = this.node.name.split(' ')[1]; // $100 
          var c = this.node.name.split(' ')[2]; // 50ml
           
          console.log(a);
          console.log(b);
          console.log(c); */
          //---------------------------------------------------------------------------------------
          var x = event.target.name.split(' ')[0]; //

          var y = event.target.name.split(' ')[1]; // 

          var angle = this.node.name.split(' ')[2]; // 

          event.target.angle += 90;
          if (event.target.angle == 360) event.target.angle = 0;
          console.log('event.target.name1' + event.target.name);
          event.target.name = x + " " + y + " " + String(event.target.angle);
          console.log('event.target.name2' + event.target.name);
          this.game_victory2(); // console.log('event.target.node.angle = '+event.target.name);
          // console.log('event.target.node.angle = '+event.target.angle);
          // console.log(this.node.children);
          // event.target.node.setRotationFromEuler(0,0,this.angle[name]); // Поворот "piece"
          // this.game_victory(); // Проверка окончания игры - Победа
          // if (this.scoreX) this.scoreX.string = "Score " + this.score;
          // event.propagationStopped = false; // Отменить остановку распространения события.
          // this.initS();
          // this.sprite[30].node.setPosition(650,300,0);
          //-------------------------------------------------------------------------------------
          // this.jbjs[0].name = null;
          // this.jbjs[0].angle = null;
          // this.jbjs[0].pos = null;
          //this.jbjs[0] = null;
          //this.jbjs[0].name
          //  this.dataS[0] = [];
          //  this.dataS[0][0] = {id:'', grid_pos:new Vec3(0,0,0), angle: 0, pos: new Vec3(0,0,0)};
          // this.dataS[0][0].id = 'Vadim Molodec';
          // this.dataS[0][0].grid_pos.set(300,300);
          //  this.dataS[0][0].angle = 900;
          // this.dataS[0][0].pos.set(200,300);
          // console.log(this.dataS[0][0]); 
          //-------------------------------------------------------------------------------------
        }
        /* _timer(){ // Таймер
            this.count--; // Обратный счет;
            if (this.timer) this.timer.string = "TIME " + String(this.count); // Отображение оставшегося времени 
              if(this.count==0){ // Если время истекло
                this.game_over(); // Конец игры
                this.unschedule(this._timer); // Остановка таймера
            }     
        } */

        /* _score(){
            let go:number = 0;
            for (let i = 0; i < this.col*this.row; i++) { // Количество колонок сетки на количество строк сетки = количество "pieces"
            if(this.angle[i]==0) go++;
            this.score = go;  
            }
            if (this.scoreX) this.scoreX.string = "Score " + this.score;
        } */

        /*  game_victory(){ // Проверка окончания игры
            this._score();
            if(this.score == 36){ // Если все углы равны нулю.
                this.onDestroy();
                if (this.game_state) this.game_state.string = "Victory!";
                this.unschedule(this._timer); // Остановка таймера
            } 
        }  */


        game_victory2() {
          var go = 0;

          for (var i = 0; i < this.col * this.row; i++) {
            // Количество колонок сетки на количество строк сетки = количество "pieces"
            if (this.node.children[i].angle == 0) go++; //this.score = go;

            if (go == this.col * this.row) this.game_state.string = "Victory!";
          }
        }
        /*  game_over(){ // Конец игры - неудача
             this.onDestroy(); // Обнулить слушателей событий
             if (this.game_state) this.game_state.string = "Game Over"; 
         } */

        /*  onDestroy (){
             this.node.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
             for (let i = 0; i < this.col*this.row; i++){
              this.sprite[i].node.off(Node.EventType.TOUCH_START, (event) => {}, this);
             } 
         } */

        /* update(){
            this.cut_out2(this.sprite3.spriteFrame,this.row,this.col);
        } */


      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "scoreX", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "timer", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "game_state", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4ae9540b75eb3c89e210837b06de279a2fca10b6.js.map