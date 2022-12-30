import * as React from 'react'
import styled from 'styled-components'

//コンポーネントに渡すパラメーターの型を定義
interface Props {
	cancel?: boolean //パラメーターを指定しなくても良い
  children: string
  onClick: () => void
}

//ボタンコンポーネントを返す関数の定義
export const Button: React.FC<Props> = (props) => (
	//渡されたテキストとクリック時の処理関数を使って、コンポーネントを描画
  <StyledButton onClick={props.onClick} className={props.cancel ? 'cancel' : ''}>
    {props.children}
  </StyledButton>
)

// styled-components
const StyledButton = styled.button`
  background-color: dodgerblue;
  border: none;
  box-shadow: none;
  color: white;
  font-size: 1rem;
  height: 2rem;
  min-width: 5rem;
  padding: 0 1rem;

	&.cancel {
		background: white;
		border: 1px solid gray;
		color: gray;
	}
`
