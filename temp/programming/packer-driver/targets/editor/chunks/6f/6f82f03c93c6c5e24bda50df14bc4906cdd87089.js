System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Graphics, Node, Rect, Label, resources, Sprite, SpriteFrame, Vec3, EventTarget, Input, math, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, eventTarget, ccclass, property, Game;

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

      _cclegacy._RF.push({}, "78e65UvoMhKAKzci9BmT7Nm", "Game_Turn2", undefined);

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
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "scoreX", _descriptor, this);

          // Для вывода
          _initializerDefineProperty(this, "timer", _descriptor2, this);

          // Для вывода текста "Game Over"
          _initializerDefineProperty(this, "game_state", _descriptor3, this);

          // Для вывода текста "Game Over"

          /*  @property(Sprite)
           sprite2: Sprite = null; */
          this.sprite3 = new Sprite();
          this.spriteN2 = [];
          this.row = 6;
          // Количество строк сетки                
          this.col = 6;
          // Количество колонок сетки
          this.height = 0;
          // Высота прямоугольника
          this.width = 0;
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
          // this.col * this.row;
          this.jsss = null;
        }

        onLoad() {
          //----------------------------------------------------------------------------------------------------------------
          resources.load('images/1/spriteFrame', SpriteFrame, (err, image) => {
            if (err) {
              console.log(err);
            }

            console.log('image.height = ' + image.height);
            console.log('image.width = ' + image.width);
            this.cut_out2(image, this.row, this.col);
          }); // this.cut_out2(this.sprite2.spriteFrame, this.row,this.col);
        }

        start() {//  console.log('this.sprite2.SpritFreme.height = '+ this.sprite2.spriteFrame.height);
          //  console.log('this.sprite2.SpritFreme.width = '+ this.sprite2.spriteFrame.width);
          // setTimeout(()=>{this.sprite_pos(); }, 3000); 
        }
        /* private row: number = 6; // Количество строк сетки                
        private col: number = 6; // Количество колонок сетки
        private height: number = 80; // Высота прямоугольника
        private width: number = 80; //  Ширина прямоугольника */


        cut_out2(sprf, row, col) {
          let height = sprf.height / col;
          let width = sprf.width / row;
          let spr = new SpriteFrame();

          for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
              // spr = this.sprite2.spriteFrame.clone(); 
              spr = sprf.clone();
              spr.rect = new Rect(j * width, i * height, width, height);
              this.spriteN2[i] = [];
              this.spriteN2[i][j] = new Node("New Sprite").addComponent(Sprite); // this.node.getParent().addChild(this.spriteN2[i][j].node);

              this.node.addChild(this.spriteN2[i][j].node);
              this.spriteN2[i][j].spriteFrame = spr; // this.spriteN2[i][j].node.setPosition(j*width-440, (i*height-280)*-1, 0);

              this.spriteN2[i][j].node.setPosition(j * (width / 2), i * (height / 2) * -1, 0); //  this.spriteN2[0][0].node.setPosition(100,200, 0);

              /*  if(i == 0 && j == 1){
               let a = 0;
               let b = 0;
               console.log('this.spriteN2[0][0].node.getPosition() = '+this.spriteN2[a][b].node.getPosition()); } */
              // console.log('this.spriteN2['+i+']['+j+'].node.getPosition() = '+this.spriteN2[i][j].node.getPosition());
              // this.sprite_pos(this.spriteN2);
              //spriteN[0][0].node.setPosition(100, 280, 0);

              this.spriteN2[i][j].addComponent("TouchDragger");
            }
          }
        }

        sprite_pos() {
          for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {// this.spriteN2[i][j].node.setPosition(100, 280, 0); 
            }
          }
        }

        draw_grid(row, col, height, width) {
          // Нарисовать сетку
          //строка,      колонка,     высота,         ширина        
          let x = 0;
          let y = 0;
          const g = this.getComponent(Graphics);
          g.lineWidth = 3;

          for (let i = 0; i < row + 1; i++) {
            // Вертикальные линии
            g.moveTo(0, y);
            g.lineTo(width * col, y);
            y = y + height;
          }

          x = 0;
          y = 0;

          for (let i = 0; i < col + 1; i++) {
            // Горизонтальные линии
            g.moveTo(x, 0);
            g.lineTo(x, height * row);
            x = x + width;
          }

          g.stroke();
        }

        find_target_pos() {
          let x = this.width / 2; // Центр прямоугольника по ширине

          let y = this.row * this.height - this.height / 2; // "Высота сетки" - половина по высоте прямоугольника. Начало верхний левый прямоугольник(центр).

          let a = 0; // Спрайты по порядку в массиве this.grid_pos.

          for (let i = 0; i < this.row * this.col; i++) {
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
        /* private row: number = 6; // Количество строк сетки                
        private col: number = 6; // Количество колонок сетки
        private height: number = 80; // Высота прямоугольника
        private width: number = 80; //  Ширина прямоугольника */


        find_target_pos2(row, col, height, width) {
          let x = this.width / 2; // Центр прямоугольника по ширине

          let y = this.row * this.height - this.height / 2; // "Высота сетки" - половина по высоте прямоугольника. Начало верхний левый прямоугольник(центр).

          let a = 0; // Спрайты по порядку в массиве this.grid_pos.

          for (let i = 0; i < this.row * this.col; i++) {
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
        /* private row: number = 6; // Количество строк сетки                
        private col: number = 6; // Количество колонок сетки
        private height: number = 80; // Высота прямоугольника
        private width: number = 80; //  Ширина прямоугольника */


        find_target_pos3(row, col, height, width) {
          let x = this.width / 2; // Центр прямоугольника по ширине

          let y = this.row * this.height - this.height / 2; // "Высота сетки" - половина по высоте прямоугольника. Начало верхний левый прямоугольник(центр).

          let a = 0; // Спрайты по порядку в массиве this.grid_pos.

          for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
              //for(let i = 0; i < this.row*this.col; i++) { // Новая строка
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
        }

        create_sprites(url) {
          // Создание спрайтов "pieces" (загрузка без нарезки)
          let url2 = ''; // Пустая строка вспомогательного адреса

          let m = 0; // Математический результат (random)

          for (let i = 0; i < this.col * this.row; i++) {
            // Количество колонок сетки на количество строк сетки = количество "pieces"
            // this.angle[i] = 0; // Инициализация массива "углов"
            url2 = url + String(i + 1) + '/spriteFrame'; // Конечный адрес

            resources.load(url2, SpriteFrame, (error, image) => {
              // Загрузка SpriteFrame   
              this.sprite[i] = new Node(String(i)).addComponent(Sprite); // Новый спрайт

              this.node.addChild(this.sprite[i].node); // Добавьте дочерний элемент к текущему узлу.

              this.sprite[i].spriteFrame = image; // "Текстура"
              // this.sprite[i].node.on(Node.EventType.TOUCH_START, (event) => {}, this); // // Регистрация события "детей"

              this.sprite[i].node.setPosition(this.grid_pos[i]); // Установка целевой позиции по this.grid_pos[i]

              m = math.randomRangeInt(0, 360); // Случайное число в диапазоне 0 - 360(целые числа)

              if (m > 0 && m <= 90) m = 90; // Выбор одного из 4 значений

              if (m > 90 && m <= 180) m = 180;
              if (m > 180 && m <= 270) m = 270;
              if (m > 270 && m <= 360) m = 0;
              this.angle[i] = m; // Запись в массив 

              this.sprite[i].node.setRotationFromEuler(0, 0, m); // Поворот "piece"

              this.sprite[i].node.on(Node.EventType.TOUCH_START, event => {}, this); // // Регистрация события "детей"
            });
          }
        }

        create_sprites2(url) {
          // Создание спрайтов "pieces" (загрузка без нарезки)
          let url2 = ''; // Пустая строка вспомогательного адреса

          for (let i = 0; i < this.col * this.row; i++) {
            // Количество колонок сетки на количество строк сетки = количество "pieces"
            // this.angle[i] = 0; // Инициализация массива "углов" 
            url2 = url + String(i + 1) + '/spriteFrame'; // Конечный адрес

            resources.load(url2, SpriteFrame, (error, image) => {
              // Загрузка SpriteFrame   
              this.sprite[i] = new Node(String(i)).addComponent(Sprite); // Новый спрайт

              this.node.addChild(this.sprite[i].node); // Добавьте дочерний элемент к текущему узлу.

              this.sprite[i].spriteFrame = image; // "Текстура"
            });
          }

          console.log('setTimeout = ' + setTimeout(() => {
            this.initS();

            this._score();
          }, 900));
        }

        initS() {
          let m = 0; // Математический результат (random)

          for (let i = 0; i < this.col * this.row; i++) {
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
          let name = Number(event.target.name); // Имя(номер по порядку)"piece"

          this.angle[name] = this.angle[name] + 90; // Против часовой стрелки

          if (this.angle[name] == 360) this.angle[name] = 0; // 360 = 0;

          this.sprite[name].node.setRotationFromEuler(0, 0, this.angle[name]); // Поворот "piece"

          this.game_victory(); // Проверка окончания игры - Победа

          if (this.scoreX) this.scoreX.string = "Score " + this.score; // event.propagationStopped = false; // Отменить остановку распространения события.
          // this.initS();
          // this.sprite[30].node.setPosition(650,300,0);
          //-------------------------------------------------------------------------------------
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
          let go = 0;

          for (let i = 0; i < this.col * this.row; i++) {
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

          for (let i = 0; i < this.col * this.row; i++) {
            this.sprite[i].node.off(Node.EventType.TOUCH_START, event => {}, this);
          }
        }
        /* update(){
            this.cut_out2(this.sprite3.spriteFrame,this.row,this.col);
        } */


      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "scoreX", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "timer", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "game_state", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=6f82f03c93c6c5e24bda50df14bc4906cdd87089.js.map