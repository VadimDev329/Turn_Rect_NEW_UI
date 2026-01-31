System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, _dec, _class, _crd, ccclass, property, TouchDragger;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "65b10eHWWNCv62y18+2XpLn", "TouchDragger", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'input', 'Input', 'Event', 'EventKeyboard', 'macro', 'Vec2', 'RigidBody2D', 'Collider2D', 'BoxCollider2D', 'Contact2DType', 'IPhysics2DContact', 'Label', 'KeyCode', 'EventMouse']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("TouchDragger", TouchDragger = (_dec = ccclass('TouchDragger'), _dec(_class = class TouchDragger extends Component {
        onLoad() {
          this.node.on(Node.EventType.TOUCH_START, event => {
            // При нажатии кнопки мыши в области целевого узла
            console.log('Touch start');
            event.propagationStopped = true;
            this.node.setSiblingIndex(36);
          }, this);
          this.node.on(Node.EventType.TOUCH_MOVE, event => {
            // При нажатии кнопки мыши в области целевого узла
            console.log('Touch move');
            this.node.setPosition(this.node.getPosition().x + event.touch.getDelta().x, this.node.getPosition().y + event.touch.getDelta().y, 0); // console.log('x ='+ this.node.getPosition().x);
            // console.log('y ='+ this.node.getPosition().y);
            // event.propagationStopped = true
          }, this);
          this.node.on(Node.EventType.TOUCH_END, event => {
            // При нажатии кнопки мыши в области целевого узла
            console.log('Touch end');
          }, this);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b8a19b7c162917f8001dbe67cdb443a60a5cc762.js.map