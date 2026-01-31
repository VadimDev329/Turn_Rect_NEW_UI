System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Graphics, Node, Rect, Label, resources, Sprite, SpriteFrame, EventTarget, Input, math, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, eventTarget, ccclass, property, Game;

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
      EventTarget = _cc.EventTarget;
      Input = _cc.Input;
      math = _cc.math;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "12d47a/G5JDiLFmMgjYh/bp", "Game_Turn5", undefined);

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
          this.row = 6;
          // Количество строк сетки                
          this.col = 6;
          // Количество колонок сетки
          this.url = "images/";
          // Адрес "картинок"
          this.count = 80;
          // Таймер
          this.score = 0;
        }

        // this.col * this.row;
        onLoad() {
          //----------------------------------------------------------------------------------------------------------------
          resources.load('images/110/spriteFrame', SpriteFrame, (err, image) => {
            if (err) {
              console.log(err);
            }

            this.cut_out4(image);
          });
          this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this); // Регистрация события "родителя" this.node

          this.schedule(this._timer, 1); //1,3
        }

        start() {}

        cut_out4(sprf) {
          var height_image = sprf.originalSize.height; // Высота исходной картинки

          var width_image = sprf.originalSize.width; // Ширина исходной картинки

          var height_rect = height_image / this.col; // Высота вырезаного прямоугольника

          var width_rect = width_image / this.row; // Ширина вырезаного прямоугольника

          var x = 0; // Координата х прямоугольника

          var y = 0; // Координата у прямоугольника

          var m = 0; // Математический результат (random)

          var spr = new SpriteFrame(); // Вспомогательный фрейм

          var sprite = null; // Очередной спрайт

          for (var i = 0; i < this.row; i++) {
            for (var j = 0; j < this.col; j++) {
              spr = sprf.clone(); // Клонирование текстуры

              spr.rect = new Rect(j * width_rect, i * height_rect, width_rect, height_rect); // Вырезать прямоугольник из текстуры

              sprite = new Node("Sprite" + String(i * j)).addComponent(Sprite); // Инициализация очередного спрайта

              this.node.addChild(sprite.node); // Добавить спрайт родительской ноде

              sprite.spriteFrame = spr; // Присвоить вырезаную текстуру спрайту
              //----------------Position----------------------------------------------

              y = height_rect * i - height_image / 2 + height_rect / 2; // Получение х очередного прямоугольника

              x = width_rect * j - width_image / 2 + width_rect / 2; // Получение у очередного прямоугольника

              sprite.node.setPosition(x, y * -1, 0); // Установить позицию очередному прямоугольнику
              //-----------------Angle-------------------------------------------------

              m = math.randomRangeInt(0, 360); // Случайное число в диапазоне 0 - 360(целые числа)

              if (m > 0 && m <= 90) m = 90; // Выбор одного из 4 значений

              if (m > 90 && m <= 180) m = 180;
              if (m > 180 && m <= 270) m = 270;
              if (m > 270 && m <= 360) m = 0;
              sprite.node.setRotationFromEuler(0, 0, m); // Поворот "piece"
              //-----------------Data---------------------------------------------------- 

              sprite.node.name = String(x) + " " + String(y) + " " + String(m); // Запись целевых: х,у и angle в память "прямоугольника"

              console.log('sprite2.node.name = ' + sprite.node.name); //------------------Event------------------------------------------------

              sprite.node.on(Node.EventType.TOUCH_START, event => {}, this); // // Регистрация события "детей"
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

        onTouchStart(event) {
          // Обработка события (клик по целевой ноде)
          event.target.angle += 90;
          if (event.target.angle == 360) event.target.angle = 0;
          this.game_victory();
        }

        _timer() {
          // Таймер
          this.count--; // Обратный счет;

          if (this.timer) this.timer.string = "TIME " + String(this.count); // Отображение оставшегося времени 

          if (this.count == 0) {
            // Если время истекло
            this.game_over(); // Конец игры
            //this.unschedule(this._timer); // Остановка таймера
          }
        }

        _score() {
          var go = 0;

          for (var i = 0; i < this.col * this.row; i++) {
            // Количество колонок сетки на количество строк сетки = количество "pieces"
            if (this.node.children[i].angle == 0) go++; // Проверка окончания игры "Победой"

            this.score = go; // "Счёт"
          }

          if (this.scoreX) this.scoreX.string = "Score " + this.score;
        }

        game_victory() {
          // Проверка окончания игры
          this._score();

          if (this.score == this.col * this.row) {
            // Если все углы равны нулю.
            this.onDestroy();
            if (this.game_state) this.game_state.string = "Victory!"; // this.unschedule(this._timer); // Остановка таймера
          }
        }

        game_over() {
          // Конец игры - неудача
          this.onDestroy(); // Обнулить слушателей событий

          if (this.game_state) this.game_state.string = "Game Over";
        }

        onDestroy() {
          // Обнулить слушателей
          this.node.off(Input.EventType.TOUCH_START, this.onTouchStart, this);

          for (var i = 0; i < this.col * this.row; i++) {
            this.node.children[i].off(Node.EventType.TOUCH_START, event => {}, this);
          }

          this.unschedule(this._timer); // Остановка таймера
        }

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
//# sourceMappingURL=5de4f846c82970a4262ef158c605f463e24b77a0.js.map