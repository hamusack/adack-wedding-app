import React from 'react';
import { Button } from '@mui/material';
/**
 * 複数のクリックを一つにまとめるHOC
 * @param {ReactComponent} WrappedComponent ラップされるコンポーネント
 * @return {ReactComponent} ラップ後コンポーネント
 */
const ClickButtonHandler = (WrappedComponent) => {

  // ラップするコンポーネントの定義
  class ClickButtonHandler extends React.Component {
    constructor(props) {
      super(props);
      this.timer = null;
    }
    /**
     * クリックハンドラ
     * @param {Object} e eventオブジェクト
     * @param {Function} callBack コールバック関数
     */
    handleClick(e, callBack) {

      e.persist(); //eventオブジェクトを切り離す

      clearTimeout(this.timer);
      this.timer = setTimeout(callBack, 200, e);
    }
    // ラップされるコンポーネントに、引き継いだpropsとハンドラを渡す
    render() {
      return (
        <WrappedComponent
          {...this.props}
          handleClick={this.handleClick.bind(this)}
        />
      );
    }
  }
  // DevTool上で確認する際の名前を定義
  ClickButtonHandler.displayName = `ClickButtonHandler(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  // ラップしたコンポーネントを返す
  return ClickButtonHandler;
};

/**
 * joinClickHandlerを利用したボタン
 */
const ClickButton = ClickButtonHandler(function ClickButton(props) {

  return (
    <Button
      className={props.className}
      onClick={e => props.handleClick(e, props.onClick)}
      disabled={props.disabled}  >
      {props.children}
    </Button>
  );
});

export default ClickButton;
