import * as React from 'react'
import styled from 'styled-components'

//受け取るパラメーターの定義
//React.ReactNode は React が JSX 内で扱える要素の型
interface Props {
  title: string
  children: React.ReactNode
}

export const Header: React.FC<Props> = (props) => (
  <HeaderWrapper>
    <HeaderTitle>
      {props.title}
    </HeaderTitle>
    <HeaderControl>
      {props.children}
    </HeaderControl>
  </HeaderWrapper>
)

// styled-components
const HeaderWrapper = styled.header`
  align-content: center;
  display: flex;
  height: 2rem;
  justify-content: space-between;
  line-height: 2rem;
  padding: 0.5rem 1rem;
`

const HeaderTitle = styled.div`
  font-size: 1.5rem;
`

const HeaderControl = styled.div`
  align-content: center;
  display: flex;
  height: 2rem;
  justify-content: center;
  
  & > * {
    margin-left: 0.5rem;
  }
`
