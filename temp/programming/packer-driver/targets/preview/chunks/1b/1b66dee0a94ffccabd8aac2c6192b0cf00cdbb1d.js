System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Graphics, Node, Rect, Label, resources, Sprite, SpriteFrame, Vec3, EventTarget, Input, math, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, eventTarget, ccclass, property, Game;

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
      Input = _cc.Input;
      math = _cc.math;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "5a020S8JeBPW5KEFDNgkWTm", "Game_Turn", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Graphics', 'Node', 'Rect', 'rect', 'Scheduler', 'Label', 'resources', 'Sprite', 'SpriteFrame', 'Vec2', 'Vec3', 'EventTarget', 'Event', 'Input', 'input', 'math']);

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
      }), _dec5 = property(Sprite), _dec(_class = (_class2 = class Game extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "scoreX", _descriptor, this);

          // Для вывода
          _initializerDefineProperty(this, "timer", _descriptor2, this);

          // Для вывода текста "Game Over"
          _initializerDefineProperty(this, "game_state", _descriptor3, this);

          // Для вывода текста "Game Over"
          _initializerDefineProperty(this, "sprite2", _descriptor4, this);

          this.spriteN2 = [];
          this.row = 6;
          // Количество строк сетки                
          this.col = 6;
          // Количество колонок сетки
          this.height = 80;
          // Высота прямоугольника
          this.width = 80;
          //  Ширина прямоугольника
          this.sprite = [];
          // Пазлы/Прямоугольники
          this.angle = [];
          // Углы на которые повёрнуты соответсвующие прямоугольники
          this.grid_pos = [];
          // Сетка конечных позиций Пазлов/Прямоугольников
          this.url = "images/";
          // Адрес "картинок"
          this.count = 80;
          // Таймер
          this.score = 0;
        }

        // this.col * this.row;
        onLoad() {
          // this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this); // Регистрация события "родителя" this.node
          //  this.schedule(this._timer,1); //1,3
          // this.draw_grid(6,6,80,80); // Нарисовать сетку
          //  this.find_target_pos(); // Найти целевые позиции
          //  this.create_sprites2(this.url); // Создать "pieces"
          // this.initS();
          // setTimeout(()=>{this._score(); }, 500);
          // this._score();
          //----------------------------------------------------------------------------------------------------------------
          //resources.preload('image/1/spriteFrame', SpriteFrame);
          // wait for while
          // console.log()
          resources.load('images/1/spriteFrame', SpriteFrame, (finish, total, item) => {
            console.log('finish = ' + finish);
            console.log('total = ' + total);
            console.log('item = ' + item);
          }, (err, spriteFrame) => {// this.node.getComponent(Sprite).spriteFrame = spriteFrame;
            // console.log(String(onprogress));
          }); //----------------------------------------------------------------------------------------------------------------

          resources.load('images/image/spriteFrame', SpriteFrame, (err, spriteFrame) => {
            this.cut_out(spriteFrame);
          }); //----------------------------------------------------------------------------------------------------------------
        }

        start() {
          /* this.draw_grid(6,6,80,80); // Нарисовать сетку
          this.find_target_pos(); // Найти целевые позиции
          this.create_sprites(this.url); // Создать "pieces"  */
          // this._score();
          // console.log('score = '+this.score);
          // console.log('angle = '+ this.angle[0]);
        }
        /*  cut_out(){
             let spr:SpriteFrame = new SpriteFrame();
              for (let i = 0; i < 6; i++) {
                 for (let j = 0; j < 6; j++) {
                  spr = this.sprite.spriteFrame.clone(); 
           
                 spr.rect = new Rect(j*80,i*80,80,80);
             
                 this.spriteN2[i*j] = new Node("New Sprite").addComponent(Sprite);
            
                 this.node.getParent().addChild(this.spriteN2[i*j].node);
                  this.spriteN2[i*j].spriteFrame = spr;
            
                 this.spriteN2[i*j].node.setPosition(j*80-440, (i*80-280)*-1, 0);
             
                 this.spriteN2[i*j].addComponent("TouchDragger");
             
                 }
             }      
         } */


        cut_out(sprf) {
          var spr = new SpriteFrame();

          for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 6; j++) {
              // spr = this.sprite2.spriteFrame.clone(); 
              spr = sprf.clone();
              spr.rect = new Rect(j * 80, i * 80, 80, 80);
              this.spriteN2[i * j] = new Node("New Sprite").addComponent(Sprite);
              this.node.getParent().addChild(this.spriteN2[i * j].node);
              this.spriteN2[i * j].spriteFrame = spr;
              this.spriteN2[i * j].node.setPosition(j * 80 - 440, (i * 80 - 280) * -1, 0);
              this.spriteN2[i * j].addComponent("TouchDragger");
            }
          }
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

        find_target_pos() {
          var x = this.width / 2; // Центр прямоугольника по ширине

          var y = this.row * this.height - this.height / 2; // "Высота сетки" - половина по высоте прямоугольника. Начало верхний левый прямоугольник(центр).

          var a = 0; // Спрайты по порядку в массиве this.grid_pos.

          for (var i = 0; i < this.row * this.col; i++) {
            // Новая строка
            if (i % this.col == 0) {
              // Новая строка 
              if (i > 0) {
                // Со второй строки
                x = this.width / 2; // Начало новой строки по иксу.

                y = y - this.height; // На строку ниже по игрику.
              }
            }

            this.grid_pos[i] = new Vec3(0, 0, 0); // Инициализация вектора.

            this.grid_pos[i].x = x; // Целевая позиция в сетке - х

            this.grid_pos[i].y = y; // Целевая позиция в сетке - у

            x = x + this.width; // Центр следующего прямоугольника по иксу.
          }
        }

        create_sprites(url) {
          var _this = this;

          // Создание спрайтов "pieces" (загрузка без нарезки)
          var url2 = ''; // Пустая строка вспомогательного адреса

          var m = 0; // Математический результат (random)

          var _loop = function _loop(i) {
            // Количество колонок сетки на количество строк сетки = количество "pieces"
            // this.angle[i] = 0; // Инициализация массива "углов"
            url2 = url + String(i + 1) + '/spriteFrame'; // Конечный адрес

            resources.load(url2, SpriteFrame, (error, image) => {
              // Загрузка SpriteFrame   
              _this.sprite[i] = new Node(String(i)).addComponent(Sprite); // Новый спрайт

              _this.node.addChild(_this.sprite[i].node); // Добавьте дочерний элемент к текущему узлу.


              _this.sprite[i].spriteFrame = image; // "Текстура"
              // this.sprite[i].node.on(Node.EventType.TOUCH_START, (event) => {}, this); // // Регистрация события "детей"

              _this.sprite[i].node.setPosition(_this.grid_pos[i]); // Установка целевой позиции по this.grid_pos[i]


              m = math.randomRangeInt(0, 360); // Случайное число в диапазоне 0 - 360(целые числа)

              if (m > 0 && m <= 90) m = 90; // Выбор одного из 4 значений

              if (m > 90 && m <= 180) m = 180;
              if (m > 180 && m <= 270) m = 270;
              if (m > 270 && m <= 360) m = 0;
              _this.angle[i] = m; // Запись в массив 

              _this.sprite[i].node.setRotationFromEuler(0, 0, m); // Поворот "piece"


              _this.sprite[i].node.on(Node.EventType.TOUCH_START, event => {}, _this); // // Регистрация события "детей"

            });
          };

          for (var i = 0; i < this.col * this.row; i++) {
            _loop(i);
          }
        }

        create_sprites2(url) {
          var _this2 = this;

          // Создание спрайтов "pieces" (загрузка без нарезки)
          var url2 = ''; // Пустая строка вспомогательного адреса

          var _loop2 = function _loop2(i) {
            // Количество колонок сетки на количество строк сетки = количество "pieces"
            // this.angle[i] = 0; // Инициализация массива "углов" 
            url2 = url + String(i + 1) + '/spriteFrame'; // Конечный адрес

            resources.load(url2, SpriteFrame, (error, image) => {
              // Загрузка SpriteFrame   
              _this2.sprite[i] = new Node(String(i)).addComponent(Sprite); // Новый спрайт

              _this2.node.addChild(_this2.sprite[i].node); // Добавьте дочерний элемент к текущему узлу.


              _this2.sprite[i].spriteFrame = image; // "Текстура"
            });
          };

          for (var i = 0; i < this.col * this.row; i++) {
            _loop2(i);
          }

          console.log('setTimeout = ' + setTimeout(() => {
            this.initS();

            this._score();
          }, 900));
        }

        initS() {
          var m = 0; // Математический результат (random)

          for (var i = 0; i < this.col * this.row; i++) {
            this.sprite[i].node.setPosition(this.grid_pos[i]); // Установка целевой позиции по this.grid_pos[i]

            m = math.randomRangeInt(0, 360); // Случайное число в диапазоне 0 - 360(целые числа)

            if (m > 0 && m <= 90) m = 90; // Выбор одного из 4 значений

            if (m > 90 && m <= 180) m = 180;
            if (m > 180 && m <= 270) m = 270;
            if (m > 270 && m <= 360) m = 0;
            this.angle[i] = m; // Запись в массив 

            this.sprite[i].node.setRotationFromEuler(0, 0, m); // Поворот "piece"

            this.sprite[i].node.on(Node.EventType.TOUCH_START, event => {}, this); // // Регистрация события "детей"
          }
        }

        onTouchStart(event) {
          // Обработка события (клик по целевой ноде)
          // event.propagationStopped = true; // Остановка распространения события.
          // event.preventSwallow = true; // "События проникающие в сиситему"
          var name = Number(event.target.name); // Имя(номер по порядку)"piece"

          this.angle[name] = this.angle[name] + 90; // Против часовой стрелки

          if (this.angle[name] == 360) this.angle[name] = 0; // 360 = 0;

          this.sprite[name].node.setRotationFromEuler(0, 0, this.angle[name]); // Поворот "piece"

          this.game_victory(); // Проверка окончания игры - Победа

          if (this.scoreX) this.scoreX.string = "Score " + this.score; // event.propagationStopped = false; // Отменить остановку распространения события.
          // this.initS();
          // this.sprite[30].node.setPosition(650,300,0);
        }

        _timer() {
          // Таймер
          this.count--; // Обратный счет;

          if (this.timer) this.timer.string = "TIME " + String(this.count); // Отображение оставшегося времени 

          if (this.count == 0) {
            // Если время истекло
            this.game_over(); // Конец игры

            this.unschedule(this._timer); // Остановка таймера
          }
        }

        _score() {
          var go = 0;

          for (var i = 0; i < this.col * this.row; i++) {
            // Количество колонок сетки на количество строк сетки = количество "pieces"
            if (this.angle[i] == 0) go++;
            this.score = go;
          }

          if (this.scoreX) this.scoreX.string = "Score " + this.score;
        }

        game_victory() {
          // Проверка окончания игры
          this._score();

          if (this.score == 36) {
            // Если все углы равны нулю.
            this.onDestroy();
            if (this.game_state) this.game_state.string = "Victory!";
            this.unschedule(this._timer); // Остановка таймера
          }
        }

        game_over() {
          // Конец игры - неудача
          this.onDestroy(); // Обнулить слушателей событий

          if (this.game_state) this.game_state.string = "Game Over";
        }

        onDestroy() {
          this.node.off(Input.EventType.TOUCH_START, this.onTouchStart, this);

          for (var i = 0; i < this.col * this.row; i++) {
            this.sprite[i].node.off(Node.EventType.TOUCH_START, event => {}, this);
          }
        }
        /* update(){
            this._score();
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
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "sprite2", [_dec5], {
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
//# sourceMappingURL=1b66dee0a94ffccabd8aac2c6192b0cf00cdbb1d.js.map