import { useImperativeHandle, forwardRef, useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  border-radius: 18px;
  color: #fff;
  background: #ff4500;
  font-size: 1rem;
  border: 0;
  padding: 0;
  margin: 0;
  height: 40px;
  font-weight: bold;
  width: 120px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #ff4500;

  &:hover {
    background: #fff;
    border: 1px solid #fff;
    color: #ff4500;
  }
`;

const Root = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
  left: 0;
  top: 0;
  display: ${(props) => (props.visible ? "block" : "none")};
`;

const Wrapper = styled.div`
  width: 500px;
  padding: 3rem 1rem;
  border-radius: 18px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #f1f1f1;
  border: 1px solid #f1f1f1;
  box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.75);
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const CloseButton = styled.button`
  border: 0;
  background: 0;
  appearance: none;
  height: 20px;
  width: 20px;
  background: url("data:image/svg+xml,%3Csvg clip-rule='evenodd' fill-rule='evenodd' stroke-linejoin='round' stroke-miterlimit='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z'/%3E%3C/svg%3E")
    center/contain no-repeat;
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
`;

const Modal = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = (e) => {
    const closeOn = ["modal-root", "close-button"];

    closeOn.includes(e.target.id) ? setVisible(false) : setVisible(true);
  };

  useImperativeHandle(refs, () => {
    return { toggleVisibility };
  });

  return (
    <>
      <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      <Root id="modal-root" onClick={toggleVisibility} visible={visible}>
        <Wrapper id="modal-wrapper">
          <CloseButton id="close-button" onClick={toggleVisibility} />
          {props.children}
        </Wrapper>
      </Root>
    </>
  );
});

export default Modal;
