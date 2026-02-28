import { _decorator, Component, Node, director } from 'cc';
import { Game } from "./Game";
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {

    @property(Node)
    dimmer: Node = null;

    @property([Node])
    allWindows: Node[] = [];

    // Тот самый метод-переключатель
    public switchWindow(event: any, windowName: string) {

        // Если мы вызываем из кода как switchWindow("Window_Victory")
        // то аргумент придет в первый параметр. Исправим это:
        if (typeof event === 'string') {
            windowName = event;
        }

        if (!windowName) return; // Защита: если имя не передали, ничего не делаем

        console.log("Пытаюсь открыть окно:", windowName);
        // Проверяем, не пустое ли имя (GamePlay — значит закрыть всё)
        const isClosing = (windowName === "GamePlay");

        // 1. Управляем фоном
        if (this.dimmer) {
            this.dimmer.active = !isClosing;
        }

        // 2. Включаем нужное окно, выключаем остальные
        this.allWindows.forEach(win => {
            win.active = (win.name === windowName);
        });

        // 3. Управляем паузой игры
        if (isClosing) {
            director.resume();
            console.log("Игра продолжается");
        } else {
            director.pause();
            console.log("Игра на паузе, открыто:", windowName);
        }
    }
}