import style from './Container.module.css';

const Container = ({ children }) => {
  return (
    <div className={style['center']}>
      <div className={style['content']}>{children}</div>
    </div>
  );
};

export default Container;
