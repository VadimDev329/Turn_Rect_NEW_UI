import { _decorator, Component, Node, Label, Vec3, tween, Color } from 'cc';
import { Game } from "./Game";
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    // Твои реальные ноды из иерархии
    @property(Node) public layerMenu: Node = null!;
    @property(Node) public layerGame: Node = null!; // Тот самый HUD (Score/Timer)
    @property(Node) public layerWindows: Node = null!;

    // Ссылка на текст счета в окне победы
    @property(Label) public finalScoreLabel: Label = null!;

    @property(Label) public stateLabel: Label = null!; // Перетащи сюда ноду GameState из Layer_Game

    @property(Node) public gameNode: Node = null!;

    @property(Node) victoryWindow: Node = null!;


    public onNextLevelBtnClick() {
        // 1. Прячем окно победы
        this.showState('GAME');

        // 2. Вручную получаем доступ к скрипту Game через ноду
        if (this.gameNode) {
            const gameScript = this.gameNode.getComponent(Game);

            if (gameScript) {
                gameScript.startNextLevel();
            } else {
                console.error("Скрипт Game не найден на gameNode!");
            }
        } else {
            console.error("gameNode не назначена в инспекторе!");
        }
    }

    start() {
        // Как только игра прогрузилась, говорим интерфейсу: "Мы в игре!"

    }

    // Метод для быстрых уведомлений (отсчет, штрафы)
    public showMessage(text: string, color: Color = Color.WHITE) {
        this.stateLabel.string = text;
        this.stateLabel.color = color;
        this.stateLabel.node.active = true;

        // Анимация появления (пульсация)
        this.stateLabel.node.setScale(new Vec3(0.5, 0.5, 1));
        tween(this.stateLabel.node)
            .to(0.2, { scale: new Vec3(1.2, 1.2, 1) }, { easing: 'backOut' })
            .start();
    }

    // Метод для переключения состояний
    // В твоем UIManager.ts
    showState(stateName: string) {
        // 1. Сначала выключаем всё
        this.layerMenu.active = false;
        this.layerGame.active = false;
        this.layerWindows.active = false;

        // 2. Включаем только то, что нужно
        switch (stateName) {
            case 'MENU':
                this.layerMenu.active = true;
                break;
            case 'GAME':
                this.layerGame.active = true;
                break;
            case 'VICTORY':
                this.layerGame.active = true; // Игра остается видна на фоне
                this.layerWindows.active = true;
                // Здесь можно включить конкретно дочернее окно Victory
               // this.layerWindows.getChildByName('VictoryWindow').active = true;
                this.victoryWindow.active = true;
                break;
        }
    }


    private playPopupAnim() {
        // Находим Window_Base внутри Victory_Root для анимации
        const winBase = this.layerWindows.getChildByPath("Victory_Root/Window_Base");
        if (winBase) {
            winBase.setScale(new Vec3(0.5, 0.5, 1));
            tween(winBase)
                .to(0.4, { scale: new Vec3(1, 1, 1) }, { easing: 'backOut' })
                .start();
        }
    }
}