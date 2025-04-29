import React, { useState } from "react";
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import device from "current-device";
import "swiper/css";
import "swiper/css/effect-fade";

interface IPeriods {
  Кино: IPeriodsEl;
  Литература: IPeriodsEl;
  Театр: IPeriodsEl;
  Наука: IPeriodsEl;
}

interface IPeriodsEl {
  start: number;
  end: number;
  events: IPeriodsElEvents;
}

interface IPeriodsElEvents {
  [key: string]: string;
}

const periods: IPeriods = {
  Кино: {
    start: 1987,
    end: 1991,
    events: {
      1987: "Хищник",
      1988: "Кто подставил кролика Роджера",
      1989: "Назад в будущее 2",
      1990: "Крепкий орешек",
      1991: "Семейка Адамс",
    },
  },
  Литература: {
    start: 1992,
    end: 1997,
    events: {
      1992: "Нобелевская премия по литературе",
      1993: "Бессонница",
      1994: "Нобелевская премия по литературе",
      1995: "Гарри Поттер",
      1996: "Новость заглушка",
      1997: "Новость заглушка",
    },
  },
  Театр: {
    start: 1999,
    end: 2004,
    events: {
      1999: 'Премьера балета "Золушка"',
      2000: "Премьера трилогии Тома Стоппарда",
      2001: "Новость заглушка",
      2002: "Новость заглушка",
      2003: "Новость заглушка",
      2004: "Новость заглушка",
    },
  },
  Наука: {
    start: 2015,
    end: 2022,
    events: {
      2015: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
      2016: "Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11",
      2017: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi",
      2018: "Страт космического аппарата",
      2019: "Google объявил о саоздании",
      2020: "Корабль crew dragon",
      2021: "Новость заглушка",
      2022: "Новость заглушка",
    },
  },
};

const isMobile = () => {
  if (device.mobile() && window.innerWidth < window.innerHeight) {
    return true;
  } else {
    return false;
  }
};

function Slider() {
  const [period, setPeriod] = useState<number>(0);
  const [periodSwiper, setperiodSwiper] = useState<SwiperClass>();
  const [eventsSwiper, setEventsSwiper] = useState<SwiperClass>();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.currentTarget.textContent) {
      let index = Number(e.currentTarget.textContent[0]) - 1;
      periodSwiper?.slideTo(index);
      setPeriod(index);
    }
  };

  const bullet = () => {
    let arr = [];

    for (let i = 0; i < Object.keys(periods).length; i++) {
      arr.push(
        <div
          key={i}
          className={i === period ? "item active" : "item"}
          onClick={handleClick}
          style={{ transform: `rotate(${60 * period}deg)` }}
        >
          <span>{i + 1}</span>
          {i === period ? <h3>{Object.keys(periods)[i]}</h3> : ""}
        </div>
      );
    }

    for (let i = Object.keys(periods).length; i < 6; i++) {
      arr.push(<div key={i}></div>);
    }

    return arr;
  };

  return (
    <div className="slider">
      <h1 className="slider__title">Исторические даты</h1>
      <div className="circle">
        <div
          className="circle__wrapper"
          style={{
            transform: `rotate(-${60 * period}deg)`,
            transition: "transform 500ms ease",
          }}
        >
          {bullet()}
        </div>
      </div>
      <div className="slider__wrapper">
        <Swiper
          slidesPerView={1}
          allowTouchMove={false}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          modules={[Pagination, Navigation, EffectFade]}
          pagination={{
            el: ".swiperPeriods__control_pagination",
            type: "custom",
            renderCustom: function (
              swiper: SwiperClass,
              current: number,
              total: number
            ) {
              return current + "/" + total;
            },
          }}
          navigation={{
            prevEl: ".swiperPeriods__control_buttonPrev",
            nextEl: ".swiperPeriods__control_buttonNext",
          }}
          onSlideChange={(swiper: SwiperClass) => {
            setPeriod(swiper.activeIndex);
            eventsSwiper?.slideTo(0);
          }}
          onSwiper={(swiper: SwiperClass) => setperiodSwiper(swiper)}
          className="swiperPeriods"
        >
          {Object.keys(periods).map((key) => (
            <>
              <SwiperSlide key={key}>
                <span>{periods[key as keyof IPeriods].start}&nbsp;</span>
                <span>{periods[key as keyof IPeriods].end}</span>
              </SwiperSlide>
            </>
          ))}
          <span className="swiperPeriods__title">
            {Object.keys(periods)[period]}
          </span>
          <div className="swiperPeriods__control">
            <div className="swiperPeriods__control_pagination"></div>
            <button className="swiperPeriods__control_buttonPrev">
              <svg
                width="10"
                height="14"
                viewBox="0 0 10 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.49988 0.750001L2.24988 7L8.49988 13.25"
                  stroke="#42567A"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <button className="swiperPeriods__control_buttonNext">
              <svg
                width="10"
                height="14"
                viewBox="0 0 10 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.50012 0.750001L7.75012 7L1.50012 13.25"
                  stroke="#42567A"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
          <ul className="swiperPeriods__bullets">
            {Object.keys(periods).map((i, index) => (
              <li
                key={i}
                className={index === period ? "bullet active" : "bullet"}
                onClick={() => {
                  setPeriod(index);
                  periodSwiper?.slideTo(index);
                }}
              ></li>
            ))}
          </ul>
        </Swiper>
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".eventsButtonPrev",
            nextEl: ".eventsButtonNext",
          }}
          slidesPerView={isMobile() ? 1 : 3}
          spaceBetween={isMobile() ? 25 : 80}
          onSwiper={(swiper: SwiperClass) => setEventsSwiper(swiper)}
          className="swiperEvents"
        >
          {Object.keys(
            periods[Object.keys(periods)[period as keyof []] as keyof IPeriods]
              .events
          ).map((key) => (
            <SwiperSlide key={key}>
              <h2>{key}</h2>
              <p>
                {
                  periods[
                    Object.keys(periods)[period as keyof []] as keyof IPeriods
                  ].events[key]
                }
              </p>
            </SwiperSlide>
          ))}
          <div className="button__wrapper">
            <button className="eventsButtonPrev">
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                transform="rotate(-180)"
              >
                <path d="M1 1L6 6L1 11" stroke="#3877EE" strokeWidth="2" />
              </svg>
            </button>
          </div>

          <div className="button__wrapper">
            <button className="eventsButtonNext">
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1L6 6L1 11" stroke="#3877EE" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </Swiper>
      </div>
    </div>
  );
}

export default Slider;
