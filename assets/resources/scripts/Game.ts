import { _decorator, Component, Node, Label, resources, Sprite, SpriteFrame, math, EventTouch, UITransform, Layers, rect, tween, Vec3, Color, Enum } from 'cc';
import { UIManager } from "./UIManager";
const { ccclass, property } = _decorator;



interface ILevel {
    rows: number;
    cols: number;
    time: number;
    maxClicks: number;
    penaltyTime: number;
    hasFreeze: boolean;
    hasSpinOut: boolean;
}

// Создаем список доступных анимаций
enum VictoryEffect {
    SPIN_WAVE,   // Вращательная волна
    BOUNCE_WAVE, // Прыгающая волна
    NONE         // Без анимации
}
// Регистрируем Enum для инспектора
Enum(VictoryEffect);

@ccclass('Game')
export class Game extends Component {
    // Убедись, что в Инспекторе привязаны эти три Label!
    @property({ type: Label }) public scoreLabel: Label | null = null;
    @property({ type: Label }) public timerLabel: Label | null = null;
    @property({ type: Label }) public stateLabel: Label | null = null;
    @property({ type: Node }) public puzzleContainer: Node | null = null;
    // Вместо путей текстом, давай сделаем массив картинок прямо в Инспекторе
    @property([SpriteFrame]) public levelImages: SpriteFrame[] = [];

    // Появится в инспекторе как выпадающий список!
    @property({ type: VictoryEffect }) public victoryEffect: VictoryEffect = VictoryEffect.BOUNCE_WAVE;

    @property public useConfetti: boolean = true;

    @property(UIManager) public ui: UIManager = null!;

    @property({ tooltip: "Если включено, уровни меняются сами" })
    public autoNextLevel: boolean = true;



    private levels: ILevel[] = [
        { rows: 3, cols: 3, time: 60, maxClicks: 10, penaltyTime: 2, hasFreeze: false, hasSpinOut: false },
        { rows: 4, cols: 4, time: 80, maxClicks: 6, penaltyTime: 5, hasFreeze: true, hasSpinOut: false },
        { rows: 6, cols: 6, time: 1000, maxClicks: 5, penaltyTime: 10, hasFreeze: true, hasSpinOut: true }
    ];

    private currentLevelIdx: number = 0;
    private currentTime: number = 0;
    private isGameOver: boolean = false;
    private score: number = 10;

    onLoad() {
        // this.startLevel(this.currentLevelIdx);
    }

    start() {
        // ПРОВЕРКА: Если всё связано, игра сама включит режим игры
        // Если хочешь начать с меню — замени на 'MENU'
        if (this.ui) {
            this.ui.showState('GAME');
        }
        this.startLevel(this.currentLevelIdx);
    }

    // Когда пазл собран, вызывай это:
    public onWin() {
        if (this.ui) this.ui.showState('VICTORY');
    }

    // Метод специально для кнопки "Next" или авто-перехода
    // Внутри класса Game в Game.ts
    public startNextLevel() {
        this.currentLevelIdx++;
        if (this.currentLevelIdx < this.levels.length) {
            this.startLevel(this.currentLevelIdx);
        } else {
            // Если уровни кончились — в меню
            this.ui.showState('MENU');
            this.currentLevelIdx = 0;
        }
    }

    startLevel(idx: number) {
        const config = this.levels[idx];
        this.currentTime = config.time;
        this.isGameOver = true; // <--- ВАЖНО: блокируем клики здесь

        // Сразу обновляем текст, чтобы игрок видел цифры до старта
        if (this.timerLabel) this.timerLabel.string = "Time: " + this.currentTime;
        if (this.scoreLabel) this.scoreLabel.string = "Score: 0";

        if (this.stateLabel) this.stateLabel.string = "";
        this.puzzleContainer?.removeAllChildren();

        const image = this.levelImages[idx];
        if (image) {
            this.setupGrid(image, config);
            this.startCountdown();
        }
    }

    private countdownValue: number = 3;

    startCountdown() {
        if (!this.stateLabel) return;

        this.unschedule(this.doCountdownTick); // Чистим старые циклы
        this.unschedule(this._timer);          // Чистим старый таймер

        this.countdownValue = 3;
        this.isGameOver = true;                // КЛИКИ ЗАБЛОКИРОВАНЫ
        this.stateLabel.node.active = true;

        // Запускаем строго: 4 тика (3, 2, 1, GO) с интервалом в 1 сек
        this.schedule(this.doCountdownTick, 1, 3, 0);
        this.doCountdownTick(); // Первый тик (цифра 3) сразу
    }

    doCountdownTick() {
        if (!this.stateLabel) return;

        if (this.countdownValue > 0) {
            this.stateLabel.string = this.countdownValue.toString();

            // Твоя анимация пульсации
            this.stateLabel.node.setScale(new Vec3(0.5, 0.5, 1));
            tween(this.stateLabel.node)
                .to(0.2, { scale: new Vec3(1.2, 1.2, 1) }, { easing: 'backOut' })
                .start();

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
            }, 0.5);

            // Важно: останавливаем сам отсчет, чтобы он не зашел на второй круг
            this.unschedule(this.doCountdownTick);
        }
    }

    setupGrid(sprf: SpriteFrame, config: ILevel) {
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
                sprite.spriteFrame = frame;

                // ВАЖНО: Добавляем строго в контейнер!
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

    onTouchStart(event: EventTouch) {
        if (this.isGameOver) return;

        const target = event.target as Node;
        const config = this.levels[this.currentLevelIdx];

        // 1. БЛОКИРОВКА: Если деталь заморожена или заблокирована — выходим
        if (target['isLocked'] || target['isFrozen']) {
            console.log("Действие заблокировано: деталь заморожена");
            return;
        }

        target['clickCount']++;

        // 2. ПРОВЕРКА ШТРАФА
        if (target['clickCount'] > config.maxClicks) {
            this.applyPenalty(target, config);
            // Мы НЕ вызываем rotatePiece здесь, деталь просто замирает и синеет
            return;
        }

        // 3. ВРАЩЕНИЕ (срабатывает, только если всё ок)
        this.rotatePiece(target);
    }

    rotatePiece(target: Node) {
        if (target['isRotating']) return;
        target['isRotating'] = true;

        const config = this.levels[this.currentLevelIdx];
        let rotationCount = 1;

        // Если на уровне включен Spin-Out, есть шанс 20%, что деталь крутанется сильнее
        if (config.hasSpinOut && Math.random() < 0.2) {
            rotationCount = Math.floor(Math.random() * 3) + 1;
        }

        let targetAngle = target.angle - (90 * rotationCount);

        tween(target)
            .to(0.2 * rotationCount, { angle: targetAngle }, { easing: 'sineOut' })
            .call(() => {
                target.angle = Math.round(target.angle) % 360;
                target['isRotating'] = false;
                this._score();
            })
            .start();
    }

    applyPenalty(target: Node, config: ILevel) {
        if (this.isGameOver) return;

        // 1. СТОП: Гасим старый таймер, чтобы он не тикнул в момент штрафа
        this.unschedule(this._timer);

        // 2. РАСЧЕТ: Отнимаем штраф
        this.currentTime -= config.penaltyTime;

        // 3. ПРОВЕРКА: Если ушли в минус или ноль
        if (this.currentTime <= 0) {
            this.game_over("OUT OF TIME!");
        }
        else {
            // Если еще живы, обновляем текст и запускаем таймер заново
            if (this.timerLabel) this.timerLabel.string = "Time: " + this.currentTime;
            this.triggerPenaltyVisual(config.penaltyTime);
            this.schedule(this._timer, 1);
        }

        target['clickCount'] = 0;
        this.freezePiece(target);
    }

    freezePiece(target: Node) {
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

        this.currentTime--;

        // Проверка СРАЗУ после вычитания
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
        }

        // ОПРЕДЕЛЯЕМ ОБЩЕЕ КОЛИЧЕСТВО ДЕТАЛЕЙ
        const config = this.levels[this.currentLevelIdx];
        const totalPieces = config.rows * config.cols; // Вот решение ошибки!

        // ПРОВЕРКА ПОБЕДЫ
        if (this.score === totalPieces && !this.isGameOver) {
            this.isGameOver = true;
            this.unschedule(this._timer);

            this.victoryAnimation();

            // Задержка перед финальным экраном, чтобы успела проиграться анимация
            this.scheduleOnce(() => {
                this.game_over("VICTORY!");
            }, 1.2);
        }
    }

    victoryAnimation() {
        if (!this.puzzleContainer) return;

        // Запускаем конфетти, если галочка стоит
        if (this.useConfetti) {
            this.spawnConfetti();
        }

        const pieces = this.puzzleContainer.children;

        pieces.forEach((piece, index) => {
            const delay = index * 0.05;

            if (this.victoryEffect === VictoryEffect.SPIN_WAVE) {
                // Анимация с вращением
                this.scheduleOnce(() => {
                    tween(piece)
                        .to(0.2, { scale: new Vec3(1.1, 1.1, 1) })
                        .by(0.4, { angle: 360 }, { easing: 'quartOut' })
                        .to(0.2, { scale: new Vec3(1, 1, 1) })
                        .start();
                }, delay);

            } else if (this.victoryEffect === VictoryEffect.BOUNCE_WAVE) {
                // Анимация с прыжком (без вращения)
                const originalPos = piece.position.clone();
                const upPos = new Vec3(originalPos.x, originalPos.y + 40, originalPos.z);

                this.scheduleOnce(() => {
                    tween(piece)
                        .to(0.15, { position: upPos, scale: new Vec3(1.1, 1.1, 1) }, { easing: 'sineOut' })
                        .to(0.15, { position: originalPos, scale: new Vec3(1, 1, 1) }, { easing: 'sineIn' })
                        .start();
                }, delay);
            }
        });
    }
    spawnConfetti() {
        const colors = [Color.RED, Color.GREEN, Color.BLUE, Color.YELLOW, Color.CYAN, Color.MAGENTA];

        // Берем текстуру от первого попавшегося кусочка пазла, чтобы не искать в ресурсах
        const referenceSprite = this.puzzleContainer?.getComponentInChildren(Sprite)?.spriteFrame;

        for (let i = 0; i < 40; i++) {
            const particle = new Node("Confetti");
            particle.layer = Layers.Enum.UI_2D;

            const ui = particle.addComponent(UITransform);
            ui.setContentSize(20, 20);

            const sprite = particle.addComponent(Sprite);
            if (referenceSprite) {
                sprite.spriteFrame = referenceSprite; // Даем картинку
            }
            sprite.color = colors[math.randomRangeInt(0, colors.length)];

            // Добавляем в Canvas или прямо в Game Node, чтобы было ВЫШЕ пазлов
            this.node.parent.addChild(particle);

            // Устанавливаем Z-index повыше (для UI в Cocos 3.x это порядок в иерархии)
            particle.setSiblingIndex(100);

            particle.setPosition(0, 0, 0);

            const destX = math.randomRange(-600, 600);
            const destY = math.randomRange(-600, 600);
            const duration = math.randomRange(0.8, 1.5);

            tween(particle)
                .to(duration, {
                    position: new Vec3(destX, destY, 0),
                    angle: math.randomRange(0, 360),
                    scale: new Vec3(0.2, 0.2, 0.2)
                }, { easing: 'circOut' })
                .call(() => particle.destroy())
                .start();
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
                tween(piece)
                    // 1. Прыжок вверх и легкое увеличение
                    .to(0.2, { position: upPos, scale: new Vec3(1.1, 1.1, 1) }, { easing: 'sineOut' })
                    // 2. Возвращение вниз с "приземлением"
                    .to(0.2, { position: originalPos, scale: new Vec3(1, 1, 1) }, { easing: 'sineIn' })
                    .start();
            }, index * 0.05); // Та самая задержка для эффекта волны
        });
    }

    game_over(reason: string = "Game Over") {
        this.isGameOver = true;
        this.unschedule(this._timer);

        if (this.stateLabel) {
            // УСТАНАВЛИВАЕМ БЕЛЫЙ ЦВЕТ (чтобы после красного штрафа Victory была белой)
            this.stateLabel.color = Color.WHITE;

            this.stateLabel.string = reason;
            this.stateLabel.node.active = true;

            // Твоя крутая анимация
            this.stateLabel.node.setScale(new Vec3(0, 0, 0));
            this.stateLabel.node.angle = -45;

            tween(this.stateLabel.node)
                .to(0.5, { scale: new Vec3(1.2, 1.2, 1), angle: 0 }, { easing: 'backOut' })
                .to(0.2, { scale: new Vec3(1, 1, 1) })
                .start();
        }

        // Если это проигрыш, обнуляем таймер. Если победа — оставляем как есть.
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
            this.ui.showState('VICTORY');
            // Больше ничего не делаем. Ждем, пока игрок нажмет кнопку, 
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

    triggerPenaltyVisual(penalty: number) {
        if (!this.stateLabel) return;

        // Показываем, сколько именно отняли
        this.stateLabel.string = `-${penalty} SEC!`;
        this.stateLabel.node.active = true;
        const originalColor = this.stateLabel.color.clone();
        this.stateLabel.color = Color.RED;

        // Тряска или просто исчезновение
        tween(this.stateLabel.node)
            .to(0.1, { scale: new Vec3(1.2, 1.2, 1) })
            .to(0.1, { scale: new Vec3(1, 1, 1) })
            .delay(0.5)
            .call(() => {
                if (this.stateLabel) {
                    this.stateLabel.string = "";
                    this.stateLabel.color = originalColor;
                }
            })
            .start();
    }

    onDestroy() {
        this.unscheduleAllCallbacks();
    }
}