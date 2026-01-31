System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, rect, Label, resources, Sprite, SpriteFrame, math, UITransform, Layers, tween, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, Game;

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
      Node = _cc.Node;
      rect = _cc.rect;
      Label = _cc.Label;
      resources = _cc.resources;
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
      math = _cc.math;
      UITransform = _cc.UITransform;
      Layers = _cc.Layers;
      tween = _cc.tween;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c7000Wv9SZNmrJi6xN+keiv", "Game_Turn7", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Rect', 'rect', 'Label', 'resources', 'Sprite', 'SpriteFrame', 'math', 'EventTouch', 'UITransform', 'Layers', 'tween', 'Vec3']);

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

          _initializerDefineProperty(this, "timerLabel", _descriptor2, this);

          _initializerDefineProperty(this, "game_state", _descriptor3, this);

          this.row = 6;
          this.col = 6;
          this.count = 80;
          this.score = 0;
          this.isGameOver = false;
        }

        onLoad() {
          // Загрузка ресурсов
          resources.load('images/110/spriteFrame', SpriteFrame, (err, image) => {
            if (err) return console.error(err);
            this.cut_out4(image);
            this.schedule(this._timer, 1);
          });
        }

        cut_out4(sprf) {
          var imgSize = sprf.originalSize;
          var rectW = imgSize.width / this.col;
          var rectH = imgSize.height / this.row;

          for (var i = 0; i < this.row; i++) {
            for (var j = 0; j < this.col; j++) {
              var piece = new Node("Piece_" + i + "_" + j);
              piece.layer = Layers.Enum.UI_2D; // 1. Добавляем UITransform (КРИТИЧНО для кликов в 3.x)

              var ui = piece.addComponent(UITransform);
              ui.setContentSize(rectW, rectH); // 2. Спрайт

              var sprite = piece.addComponent(Sprite);

              if (piece.angle !== 0) {
                sprite.grayscale = true;
              }

              var frame = sprf.clone();
              frame.rect = rect(j * rectW, i * rectH, rectW, rectH);
              sprite.spriteFrame = frame;
              this.node.addChild(piece); // 3. Позиция

              var posX = j * rectW - imgSize.width / 2 + rectW / 2;
              var posY = i * rectH - imgSize.height / 2 + rectH / 2;
              piece.setPosition(posX, -posY, 0); // 4. Рандомный поворот

              var angles = [0, 90, 180, 270];
              piece.angle = angles[math.randomRangeInt(0, 4)]; // 5. ПОДПИСЫВАЕМ КАЖДЫЙ КУСОЧИК (как в твоем рабочем коде)

              piece.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
            }
          }
        }

        onTouchStart(event) {
          if (this.isGameOver) return;
          var target = event.target; // --- ЛОГИКА ШТРАФА (Усложнение) ---

          if (!target['clickCount']) target['clickCount'] = 0;
          target['clickCount']++; // Если игрок "заспамил" деталь (например, более 6 кликов)

          if (target['clickCount'] > 6) {
            this.count -= 5; // Штраф: -5 секунд

            target['clickCount'] = 0; // Сброс счетчика

            this.triggerPenaltyVisual(); // Вызываем нашу вспышку!

            if (this.timerLabel) this.timerLabel.string = "TIME " + this.count;
            console.log("Штраф за лишние клики! -5 сек"); // Можно добавить визуальную встряску (shake), если захочешь
          } // --- ОСНОВНАЯ МЕХАНИКА (Поворот) ---


          var targetAngle = target.angle + 90;
          tween(target).to(0.2, {
            angle: targetAngle
          }, {
            easing: 'sineOut'
          }).call(() => {
            // Нормализация угла
            var currentAngle = Math.round(target.angle) % 360;
            if (Math.abs(currentAngle) === 0) target.angle = 0; // --- ПОДСКАЗКА (ЗАКОММЕНТИРОВАНО) ---

            /* const sprite = target.getComponent(Sprite);
            if (sprite) {
                sprite.grayscale = (target.angle !== 0);
            }
            */

            this.game_victory();
          }).start();
        } // --- Остальная логика без изменений ---


        _timer() {
          if (this.isGameOver) return;
          this.count--; // Проверяем через консоль, идет ли счет

          console.log("Осталось времени:", this.count);

          if (this.timerLabel) {
            this.timerLabel.string = "TIME " + this.count;
          }

          if (this.count <= 0) {
            this.game_over();
          }
        }

        _score() {
          var go = 0;
          this.node.children.forEach(child => {
            // Используем Math.round, чтобы исключить микро-ошибки плавающей точки
            var currentAngle = Math.round(child.angle) % 360; // В JS % может вернуть -90, поэтому берем абсолютное значение

            if (Math.abs(currentAngle) === 0) {
              go++;
            }
          });
          this.score = go;
          console.log("Текущий счет:", this.score, "из", this.col * this.row);

          if (this.scoreX) {
            this.scoreX.string = "Score " + this.score;
          }
        }

        game_victory() {
          this._score();

          if (this.score === this.col * this.row) {
            if (this.game_state) this.game_state.string = "Victory!";
            this.stopGame();
          }
        }

        game_over() {
          if (this.game_state) this.game_state.string = "Game Over";
          this.stopGame();
        }

        stopGame() {
          this.isGameOver = true;
          this.unschedule(this._timer); // Снимаем слушателей с каждого ребенка

          this.node.children.forEach(child => {
            child.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
          });
        }

        onDestroy() {
          this.unscheduleAllCallbacks();
        }

        triggerPenaltyVisual() {
          if (!this.timerLabel) return;
          var node = this.timerLabel.node;
          var label = node.getComponent(Label); // 1. Сохраняем исходные данные, чтобы вернуться к ним

          var startPos = node.position.clone();
          var originalColor = label.color.clone(); // 2. Тряска относительно СТАРТОВОЙ позиции

          tween(node).to(0.05, {
            scale: new math.Vec3(1.2, 1.2, 1)
          }).call(() => {
            label.color = math.color(255, 0, 0);
          }) // Используем прибавление к текущей позиции, а не замену на (5, 0, 0)
          .to(0.05, {
            position: new math.Vec3(startPos.x + 10, startPos.y, 0)
          }).to(0.05, {
            position: new math.Vec3(startPos.x - 10, startPos.y, 0)
          }).to(0.05, {
            position: new math.Vec3(startPos.x, startPos.y, 0)
          }).delay(0.2).to(0.1, {
            scale: new math.Vec3(1, 1, 1)
          }).call(() => {
            label.color = originalColor;
          }).start();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "scoreX", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "timerLabel", [_dec3], {
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
//# sourceMappingURL=2412d659ad904c8802139dfadc94ff4dd8549cdd.js.map