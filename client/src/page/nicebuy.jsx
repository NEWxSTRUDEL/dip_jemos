import React, { useState, useEffect } from 'react';
import "./authorpage.css"


function Nicebuy() {
  // Состояние для отображения анимации
  const [showAnimation, setShowAnimation] = useState(false);

  // useEffect для запуска анимации при загрузке страницы
  useEffect(() => {
    setShowAnimation(true);
  }, []);

  return (
    <div className="congratulation-page">
      <div className={`congratulation-content ${showAnimation ? 'animate' : ''}`}>
        <h1>Поздравляем с покупкой курса!</h1>
        <p>Вы успешно приобрели доступ к нашему курсу. Желаем вам удачи и успехов!</p>
        ✨🎉🎊
      </div>
    </div>
  );
}

export default Nicebuy;
