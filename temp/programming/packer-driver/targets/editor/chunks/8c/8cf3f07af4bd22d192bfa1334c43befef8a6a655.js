System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Label, Sprite, SpriteFrame, math, UITransform, Layers, rect, tween, Vec3, Color, Enum, UIManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _crd, ccclass, property, VictoryEffect, Game;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfUIManager(extras) {
    _reporterNs.report("UIManager", "./UIManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      Label = _cc.Label;
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
      math = _cc.math;
      UITransform = _cc.UITransform;
      Layers = _cc.Layers;
      rect = _cc.rect;
      tween = _cc.tween;
      Vec3 = _cc.Vec3;
      Color = _cc.Color;
      Enum = _cc.Enum;
    }, function (_unresolved_2) {
      UIManager = _unresolved_2.UIManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b55b6ZByr9DQKgVYYyHNZyK", "Game", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Label', 'resources', 'Sprite', 'SpriteFrame', 'math', 'EventTouch', 'UITransform', 'Layers', 'rect', 'tween', 'Vec3', 'Color', 'Enum']);

      ({
        ccclass,
        property
      } = _decorator);

      // Создаем список доступных анимаций
      VictoryEffect = /*#__PURE__*/function (VictoryEffect) {
        VictoryEffect[VictoryEffect["SPIN_WAVE"] = 0] = "SPIN_WAVE";
        VictoryEffect[VictoryEffect["BOUNCE_WAVE"] = 1] = "BOUNCE_WAVE";
        VictoryEffect[VictoryEffect["NONE"] = 2] = "NONE";
        return VictoryEffect;
      }(VictoryEffect || {}); // Регистрируем Enum для инспектора


      Enum(VictoryEffect);

      _export("Game", Game = (_dec = ccclass('Game'), _dec2 = property({
        type: Label
      }), _dec3 = property({
        type: Label
      }), _dec4 = property({
        type: Label
      }), _dec5 = property({
        type: Node
      }), _dec6 = property([SpriteFrame]), _dec7 = property({
        type: VictoryEffect
      }), _dec8 = property(_crd && UIManager === void 0 ? (_reportPossibleCrUseOfUIManager({
        error: Error()
      }), UIManager) : UIManager), _dec9 = property({
        tooltip: "Если включено, уровни меняются сами"
      }), _dec(_class = (_class2 = class Game extends Component {
        constructor(...args) {
          super(...args);

          // Убедись, что в Инспекторе привязаны эти три Label!
          _initializerDefineProperty(this, "scoreLabel", _descriptor, this);

          _initializerDefineProperty(this, "timerLabel", _descriptor2, this);

          _initializerDefineProperty(this, "stateLabel", _descriptor3, this);

          _initializerDefineProperty(this, "puzzleContainer", _descriptor4, this);

          // Вместо путей текстом, давай сделаем массив картинок прямо в Инспекторе
          _initializerDefineProperty(this, "levelImages", _descriptor5, this);

          // Появится в инспекторе как выпадающий список!
          _initializerDefineProperty(this, "victoryEffect", _descriptor6, this);

          _initializerDefineProperty(this, "useConfetti", _descriptor7, this);

          _initializerDefineProperty(this, "ui", _descriptor8, this);

          _initializerDefineProperty(this, "autoNextLevel", _descriptor9, this);

          this.levels = [{
            rows: 3,
            cols: 3,
            time: 60,
            maxClicks: 10,
            penaltyTime: 2,
            hasFreeze: false,
            hasSpinOut: false
          }, {
            rows: 4,
            cols: 4,
            time: 80,
            maxClicks: 6,
            penaltyTime: 5,
            hasFreeze: true,
            hasSpinOut: false
          }, {
            rows: 6,
            cols: 6,
            time: 1000,
            maxClicks: 5,
            penaltyTime: 10,
            hasFreeze: true,
            hasSpinOut: true
          }];
          this.currentLevelIdx = 0;
          this.currentTime = 0;
          this.isGameOver = false;
          this.score = 0;
          this.countdownValue = 3;
        }

        onLoad() {// this.startLevel(this.currentLevelIdx);
        }

        start() {
          // ПРОВЕРКА: Если всё связано, игра сама включит режим игры
          // Если хочешь начать с меню — замени на 'MENU'
          if (this.ui) {
            this.ui.showState('GAME');
          }

          this.startLevel(this.currentLevelIdx);
        } // Когда пазл собран, вызывай это:


        onWin() {
          if (this.ui) this.ui.showState('VICTORY');
        } // Метод специально для кнопки "Next" или авто-перехода
        // Внутри класса Game в Game.ts


        startNextLevel() {
          this.currentLevelIdx++;

          if (this.currentLevelIdx < this.levels.length) {
            this.startLevel(this.currentLevelIdx);
          } else {
            // Если уровни кончились — в меню
            this.ui.showState('MENU');
            this.currentLevelIdx = 0;
          }
        }

        startLevel(idx) {
          var _this$puzzleContainer;

          const config = this.levels[idx];
          this.currentTime = config.time;
          this.isGameOver = true; // <--- ВАЖНО: блокируем клики здесь
          // Сразу обновляем текст, чтобы игрок видел цифры до старта

          if (this.timerLabel) this.timerLabel.string = "Time: " + this.currentTime;
          if (this.scoreLabel) this.scoreLabel.string = "Score: 0";
          if (this.stateLabel) this.stateLabel.string = "";
          (_this$puzzleContainer = this.puzzleContainer) == null || _this$puzzleContainer.removeAllChildren();
          const image = this.levelImages[idx];

          if (image) {
            this.setupGrid(image, config);
            this.startCountdown();
          }
        }

        startCountdown() {
          if (!this.stateLabel) return;
          this.unschedule(this.doCountdownTick); // Чистим старые циклы

          this.unschedule(this._timer); // Чистим старый таймер

          this.countdownValue = 3;
          this.isGameOver = true; // КЛИКИ ЗАБЛОКИРОВАНЫ

          this.stateLabel.node.active = true; // Запускаем строго: 4 тика (3, 2, 1, GO) с интервалом в 1 сек

          this.schedule(this.doCountdownTick, 1, 3, 0);
          this.doCountdownTick(); // Первый тик (цифра 3) сразу
        }

        doCountdownTick() {
          if (!this.stateLabel) return;

          if (this.countdownValue > 0) {
            this.stateLabel.string = this.countdownValue.toString(); // Твоя анимация пульсации

            this.stateLabel.node.setScale(new Vec3(0.5, 0.5, 1));
            tween(this.stateLabel.node).to(0.2, {
              scale: new Vec3(1.2, 1.2, 1)
            }, {
              easing: 'backOut'
            }).start();
            this.countdownValue--;
          } else {
            // ЭТОТ БЛОК СРАБОТАЕТ ТОЛЬКО ОДИН РАЗ ДЛЯ "GO!"
            this.stateLabel.string = "GO!";
            this.isGameOver = false; // ТЕПЕРЬ МОЖНО КЛИКАТЬ

            this.unschedule(this._timer);
            this.schedule(this._timer, 1); // ВКЛЮЧАЕМ ТАЙМЕР
            // Прячем надпись "GO!" через полсекунды

            this.scheduleOnce(() => {
              if (this.stateLabel && this.stateLabel.string === "GO!") {
                this.stateLabel.string = "";
              }
            }, 0.5); // Важно: останавливаем сам отсчет, чтобы он не зашел на второй круг

            this.unschedule(this.doCountdownTick);
          }
        }

        setupGrid(sprf, config) {
          this.isGameOver = true; // Запираем игру на замок, пока идет подготовка

          const imgSize = sprf.originalSize;
          const rectW = imgSize.width / config.cols;
          const rectH = imgSize.height / config.rows;

          for (let i = 0; i < config.rows; i++) {
            for (let j = 0; j < config.cols; j++) {
              const piece = new Node(`Piece_${i}_${j}`);
              piece.layer = Layers.Enum.UI_2D;
              const ui = piece.addComponent(UITransform);
              ui.setContentSize(rectW, rectH);
              const sprite = piece.addComponent(Sprite);
              const frame = sprf.clone();
              frame.rect = rect(j * rectW, i * rectH, rectW, rectH);
              sprite.spriteFrame = frame; // ВАЖНО: Добавляем строго в контейнер!

              if (this.puzzleContainer) {
                this.puzzleContainer.addChild(piece);
              }

              const posX = j * rectW - imgSize.width / 2 + rectW / 2;
              const posY = i * rectH - imgSize.height / 2 + rectH / 2;
              piece.setPosition(posX, -posY, 0);
              const angles = [0, 90, 180, 270];
              piece.angle = angles[math.randomRangeInt(0, 4)];
              piece['clickCount'] = 0;
              piece['isLocked'] = false;
              piece.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
            }
          }
        }

        onTouchStart(event) {
          if (this.isGameOver) return;
          const target = event.target;
          const config = this.levels[this.currentLevelIdx]; // 1. БЛОКИРОВКА: Если деталь заморожена или заблокирована — выходим

          if (target['isLocked'] || target['isFrozen']) {
            console.log("Действие заблокировано: деталь заморожена");
            return;
          }

          target['clickCount']++; // 2. ПРОВЕРКА ШТРАФА

          if (target['clickCount'] > config.maxClicks) {
            this.applyPenalty(target, config); // Мы НЕ вызываем rotatePiece здесь, деталь просто замирает и синеет

            return;
          } // 3. ВРАЩЕНИЕ (срабатывает, только если всё ок)


          this.rotatePiece(target);
        }

        rotatePiece(target) {
          if (target['isRotating']) return;
          target['isRotating'] = true;
          const config = this.levels[this.currentLevelIdx];
          let rotationCount = 1; // Если на уровне включен Spin-Out, есть шанс 20%, что деталь крутанется сильнее

          if (config.hasSpinOut && Math.random() < 0.2) {
            rotationCount = Math.floor(Math.random() * 3) + 1;
          }

          let targetAngle = target.angle - 90 * rotationCount;
          tween(target).to(0.2 * rotationCount, {
            angle: targetAngle
          }, {
            easing: 'sineOut'
          }).call(() => {
            target.angle = Math.round(target.angle) % 360;
            target['isRotating'] = false;

            this._score();
          }).start();
        }

        applyPenalty(target, config) {
          if (this.isGameOver) return; // 1. СТОП: Гасим старый таймер, чтобы он не тикнул в момент штрафа

          this.unschedule(this._timer); // 2. РАСЧЕТ: Отнимаем штраф

          this.currentTime -= config.penaltyTime; // 3. ПРОВЕРКА: Если ушли в минус или ноль

          if (this.currentTime <= 0) {
            this.game_over("OUT OF TIME!");
          } else {
            // Если еще живы, обновляем текст и запускаем таймер заново
            if (this.timerLabel) this.timerLabel.string = "Time: " + this.currentTime;
            this.triggerPenaltyVisual(config.penaltyTime);
            this.schedule(this._timer, 1);
          }

          target['clickCount'] = 0;
          this.freezePiece(target);
        }

        freezePiece(target) {
          target['isFrozen'] = true;
          const sprite = target.getComponent(Sprite);

          if (sprite) {
            // Включаем встроенный черно-белый режим
            sprite.grayscale = true;
          }

          this.scheduleOnce(() => {
            target['isFrozen'] = false;

            if (sprite) {
              // Выключаем и возвращаем цвета
              sprite.grayscale = false;
            }
          }, 2);
        }

        _timer() {
          if (this.isGameOver) return;
          this.currentTime--; // Проверка СРАЗУ после вычитания

          if (this.currentTime <= 0) {
            this.currentTime = 0;
            if (this.timerLabel) this.timerLabel.string = "Time: 0";
            this.game_over("TIME IS UP!"); // Метод, где ставится isGameOver = true

            return;
          }

          if (this.timerLabel) {
            this.timerLabel.string = "Time: " + this.currentTime;
          }
        }

        _score() {
          let correctPieces = 0;

          if (this.puzzleContainer) {
            // Считаем текущее количество правильно повернутых деталей
            this.puzzleContainer.children.forEach(child => {
              let angle = Math.round(child.angle) % 360;

              if (Math.abs(angle) === 0 || Math.abs(angle) === 360) {
                correctPieces++;
              }
            });
          }

          this.score = correctPieces;

          if (this.scoreLabel) {
            this.scoreLabel.string = "Score: " + this.score;
          } // ОПРЕДЕЛЯЕМ ОБЩЕЕ КОЛИЧЕСТВО ДЕТАЛЕЙ


          const config = this.levels[this.currentLevelIdx];
          const totalPieces = config.rows * config.cols; // Вот решение ошибки!
          // ПРОВЕРКА ПОБЕДЫ

          if (this.score === totalPieces && !this.isGameOver) {
            this.isGameOver = true;
            this.unschedule(this._timer);
            this.victoryAnimation(); // Задержка перед финальным экраном, чтобы успела проиграться анимация

            this.scheduleOnce(() => {
              this.game_over("VICTORY!");
            }, 1.2);
          }
        }

        victoryAnimation() {
          if (!this.puzzleContainer) return; // Запускаем конфетти, если галочка стоит

          if (this.useConfetti) {
            this.spawnConfetti();
          }

          const pieces = this.puzzleContainer.children;
          pieces.forEach((piece, index) => {
            const delay = index * 0.05;

            if (this.victoryEffect === VictoryEffect.SPIN_WAVE) {
              // Анимация с вращением
              this.scheduleOnce(() => {
                tween(piece).to(0.2, {
                  scale: new Vec3(1.1, 1.1, 1)
                }).by(0.4, {
                  angle: 360
                }, {
                  easing: 'quartOut'
                }).to(0.2, {
                  scale: new Vec3(1, 1, 1)
                }).start();
              }, delay);
            } else if (this.victoryEffect === VictoryEffect.BOUNCE_WAVE) {
              // Анимация с прыжком (без вращения)
              const originalPos = piece.position.clone();
              const upPos = new Vec3(originalPos.x, originalPos.y + 40, originalPos.z);
              this.scheduleOnce(() => {
                tween(piece).to(0.15, {
                  position: upPos,
                  scale: new Vec3(1.1, 1.1, 1)
                }, {
                  easing: 'sineOut'
                }).to(0.15, {
                  position: originalPos,
                  scale: new Vec3(1, 1, 1)
                }, {
                  easing: 'sineIn'
                }).start();
              }, delay);
            }
          });
        }

        spawnConfetti() {
          var _this$puzzleContainer2;

          const colors = [Color.RED, Color.GREEN, Color.BLUE, Color.YELLOW, Color.CYAN, Color.MAGENTA]; // Берем текстуру от первого попавшегося кусочка пазла, чтобы не искать в ресурсах

          const referenceSprite = (_this$puzzleContainer2 = this.puzzleContainer) == null || (_this$puzzleContainer2 = _this$puzzleContainer2.getComponentInChildren(Sprite)) == null ? void 0 : _this$puzzleContainer2.spriteFrame;

          for (let i = 0; i < 40; i++) {
            const particle = new Node("Confetti");
            particle.layer = Layers.Enum.UI_2D;
            const ui = particle.addComponent(UITransform);
            ui.setContentSize(20, 20);
            const sprite = particle.addComponent(Sprite);

            if (referenceSprite) {
              sprite.spriteFrame = referenceSprite; // Даем картинку
            }

            sprite.color = colors[math.randomRangeInt(0, colors.length)]; // Добавляем в Canvas или прямо в Game Node, чтобы было ВЫШЕ пазлов

            this.node.parent.addChild(particle); // Устанавливаем Z-index повыше (для UI в Cocos 3.x это порядок в иерархии)

            particle.setSiblingIndex(100);
            particle.setPosition(0, 0, 0);
            const destX = math.randomRange(-600, 600);
            const destY = math.randomRange(-600, 600);
            const duration = math.randomRange(0.8, 1.5);
            tween(particle).to(duration, {
              position: new Vec3(destX, destY, 0),
              angle: math.randomRange(0, 360),
              scale: new Vec3(0.2, 0.2, 0.2)
            }, {
              easing: 'circOut'
            }).call(() => particle.destroy()).start();
          }
        }

        bounceWaveAnimation() {
          if (!this.puzzleContainer) return;
          const pieces = this.puzzleContainer.children;
          pieces.forEach((piece, index) => {
            // Сохраняем начальную позицию, чтобы деталь вернулась точно на место
            const originalPos = piece.position.clone();
            const upPos = new Vec3(originalPos.x, originalPos.y + 30, originalPos.z);
            this.scheduleOnce(() => {
              tween(piece) // 1. Прыжок вверх и легкое увеличение
              .to(0.2, {
                position: upPos,
                scale: new Vec3(1.1, 1.1, 1)
              }, {
                easing: 'sineOut'
              }) // 2. Возвращение вниз с "приземлением"
              .to(0.2, {
                position: originalPos,
                scale: new Vec3(1, 1, 1)
              }, {
                easing: 'sineIn'
              }).start();
            }, index * 0.05); // Та самая задержка для эффекта волны
          });
        }

        game_over(reason = "Game Over") {
          this.isGameOver = true;
          this.unschedule(this._timer);

          if (this.stateLabel) {
            // УСТАНАВЛИВАЕМ БЕЛЫЙ ЦВЕТ (чтобы после красного штрафа Victory была белой)
            this.stateLabel.color = Color.WHITE;
            this.stateLabel.string = reason;
            this.stateLabel.node.active = true; // Твоя крутая анимация

            this.stateLabel.node.setScale(new Vec3(0, 0, 0));
            this.stateLabel.node.angle = -45;
            tween(this.stateLabel.node).to(0.5, {
              scale: new Vec3(1.2, 1.2, 1),
              angle: 0
            }, {
              easing: 'backOut'
            }).to(0.2, {
              scale: new Vec3(1, 1, 1)
            }).start();
          } // Если это проигрыш, обнуляем таймер. Если победа — оставляем как есть.


          if (reason !== "VICTORY!") {
            this.currentTime = 0;
            if (this.timerLabel) this.timerLabel.string = "Time: 0";
          }

          this.stopGame();
          /*
          // ВОТ ЭТОТ БЛОК "АВТОПИЛОТА":
          if (reason === "VICTORY!") {
              this.ui.showState('VICTORY');
              this.scheduleOnce(() => {
                  this.currentLevelIdx++; // Готовим следующий уровень
                    // Проверяем, есть ли у нас еще уровни в списке
                  if (this.currentLevelIdx < this.levels.length) {
                      this.startLevel(this.currentLevelIdx);
                      this.ui.showState('GAME');
                  } else {
                      // Если уровни закончились
                      if (this.stateLabel) this.stateLabel.string = "YOU ARE THE CHAMPION!";
                      this.currentLevelIdx = 0; // Сбрасываем на начало на всякий случай
                  }
              }, 4.0);
          }
          */

          if (reason === "VICTORY!") {
            this.ui.showState('VICTORY'); // Больше ничего не делаем. Ждем, пока игрок нажмет кнопку, 
            // которая вызовет UIManager -> onNextLevelBtnClick
          }
        }

        stopGame() {
          this.isGameOver = true;
          this.unschedule(this._timer);
          this.node.children.forEach(child => {
            child.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
          });
        }

        triggerPenaltyVisual(penalty) {
          if (!this.stateLabel) return; // Показываем, сколько именно отняли

          this.stateLabel.string = `-${penalty} SEC!`;
          this.stateLabel.node.active = true;
          const originalColor = this.stateLabel.color.clone();
          this.stateLabel.color = Color.RED; // Тряска или просто исчезновение

          tween(this.stateLabel.node).to(0.1, {
            scale: new Vec3(1.2, 1.2, 1)
          }).to(0.1, {
            scale: new Vec3(1, 1, 1)
          }).delay(0.5).call(() => {
            if (this.stateLabel) {
              this.stateLabel.string = "";
              this.stateLabel.color = originalColor;
            }
          }).start();
        }

        onDestroy() {
          this.unscheduleAllCallbacks();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "scoreLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "timerLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "stateLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "puzzleContainer", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "levelImages", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "victoryEffect", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return VictoryEffect.BOUNCE_WAVE;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "useConfetti", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return true;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "ui", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "autoNextLevel", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return true;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8cf3f07af4bd22d192bfa1334c43befef8a6a655.js.map