System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Label, Vec3, tween, Color, Game, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _crd, ccclass, property, UIManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGame(extras) {
    _reporterNs.report("Game", "./Game", _context.meta, extras);
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
      Vec3 = _cc.Vec3;
      tween = _cc.tween;
      Color = _cc.Color;
    }, function (_unresolved_2) {
      Game = _unresolved_2.Game;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "38971J0iMRGm5vpD0eGMyDb", "UIManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Label', 'Vec3', 'tween', 'Color']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("UIManager", UIManager = (_dec = ccclass('UIManager'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Label), _dec6 = property(Label), _dec7 = property(Node), _dec8 = property(Node), _dec(_class = (_class2 = class UIManager extends Component {
        constructor(...args) {
          super(...args);

          // Твои реальные ноды из иерархии
          _initializerDefineProperty(this, "layerMenu", _descriptor, this);

          _initializerDefineProperty(this, "layerGame", _descriptor2, this);

          // Тот самый HUD (Score/Timer)
          _initializerDefineProperty(this, "layerWindows", _descriptor3, this);

          // Ссылка на текст счета в окне победы
          _initializerDefineProperty(this, "finalScoreLabel", _descriptor4, this);

          _initializerDefineProperty(this, "stateLabel", _descriptor5, this);

          // Перетащи сюда ноду GameState из Layer_Game
          _initializerDefineProperty(this, "gameNode", _descriptor6, this);

          _initializerDefineProperty(this, "victoryWindow", _descriptor7, this);
        }

        onNextLevelBtnClick() {
          // 1. Прячем окно победы
          this.showState('GAME'); // 2. Вручную получаем доступ к скрипту Game через ноду

          if (this.gameNode) {
            const gameScript = this.gameNode.getComponent(_crd && Game === void 0 ? (_reportPossibleCrUseOfGame({
              error: Error()
            }), Game) : Game);

            if (gameScript) {
              gameScript.startNextLevel();
            } else {
              console.error("Скрипт Game не найден на gameNode!");
            }
          } else {
            console.error("gameNode не назначена в инспекторе!");
          }
        }

        start() {// Как только игра прогрузилась, говорим интерфейсу: "Мы в игре!"
        } // Метод для быстрых уведомлений (отсчет, штрафы)


        showMessage(text, color = Color.WHITE) {
          this.stateLabel.string = text;
          this.stateLabel.color = color;
          this.stateLabel.node.active = true; // Анимация появления (пульсация)

          this.stateLabel.node.setScale(new Vec3(0.5, 0.5, 1));
          tween(this.stateLabel.node).to(0.2, {
            scale: new Vec3(1.2, 1.2, 1)
          }, {
            easing: 'backOut'
          }).start();
        } // Метод для переключения состояний
        // В твоем UIManager.ts


        showState(stateName) {
          // 1. Сначала выключаем всё
          this.layerMenu.active = false;
          this.layerGame.active = false;
          this.layerWindows.active = false; // 2. Включаем только то, что нужно

          switch (stateName) {
            case 'MENU':
              this.layerMenu.active = true;
              break;

            case 'GAME':
              this.layerGame.active = true;
              break;

            case 'VICTORY':
              this.layerGame.active = true; // Игра остается видна на фоне

              this.layerWindows.active = true; // Здесь можно включить конкретно дочернее окно Victory
              // this.layerWindows.getChildByName('VictoryWindow').active = true;

              this.victoryWindow.active = true;
              break;
          }
        }

        playPopupAnim() {
          // Находим Window_Base внутри Victory_Root для анимации
          const winBase = this.layerWindows.getChildByPath("Victory_Root/Window_Base");

          if (winBase) {
            winBase.setScale(new Vec3(0.5, 0.5, 1));
            tween(winBase).to(0.4, {
              scale: new Vec3(1, 1, 1)
            }, {
              easing: 'backOut'
            }).start();
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "layerMenu", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "layerGame", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "layerWindows", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "finalScoreLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "stateLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "gameNode", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "victoryWindow", [_dec8], {
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
//# sourceMappingURL=0bdbb8d8c2fd7124c452b648276e9a2dd8452ca6.js.map