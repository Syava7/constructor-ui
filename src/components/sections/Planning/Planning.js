import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import * as Tabs from "@radix-ui/react-tabs";

import { useTranslation } from "../../../contexts/LanguageContext";
import {
  ContentContainer,
  Section,
  Typography,
  Arrow,
  Button,
  Modal,
  ProgressNumbers,
} from "../../shared";

import useMediaQuery from "../../../hooks/useMediaQuery";
import { useSwiperNavigation } from "../../../hooks/useSwiperNavigation";

import { mediaQueries } from "../../../utils/constants";

import styles from "./Planning.module.scss";
import { ColorsInjector } from "../../../containers";

const Zoom = ({ onClick, settings }) => {
  return (
    <ColorsInjector
      background={settings.zoomButtonBackground}
      borderColor={settings.zoomButtonBorderColor}
    >
      <button
        style={{ borderRadius: settings.zoomButtonBorderRadius }}
        onClick={onClick}
        className={styles.zoom}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.4777 19.874L20.4783 19.8746C20.5164 19.9124 20.5466 19.9573 20.5672 20.0068C20.5879 20.0563 20.5985 20.1094 20.5985 20.163C20.5985 20.2167 20.5879 20.2698 20.5672 20.3193C20.5466 20.3688 20.5164 20.4137 20.4783 20.4515L20.4769 20.4529C20.4391 20.491 20.3941 20.5212 20.3446 20.5418C20.2951 20.5625 20.242 20.5731 20.1884 20.5731C20.1348 20.5731 20.0817 20.5625 20.0322 20.5418C19.9827 20.5212 19.9377 20.491 19.9 20.4529L19.8994 20.4523L15.4106 15.957L15.2469 15.7931L15.071 15.9438C13.4452 17.3374 11.3428 18.047 9.2051 17.9238C7.06734 17.8006 5.06042 16.8541 3.60551 15.283C2.1506 13.7118 1.36082 11.6382 1.40192 9.49733C1.44301 7.35642 2.31179 5.31465 3.82591 3.80052C5.34004 2.2864 7.38181 1.41762 9.52272 1.37653C11.6636 1.33543 13.7372 2.12521 15.3083 3.58012C16.8795 5.03503 17.8259 7.04195 17.9492 9.17971C18.0724 11.3175 17.3628 13.4198 15.9692 15.0456L15.8184 15.2215L15.9824 15.3852L20.4777 19.874ZM3.47837 5.51361C2.6577 6.74184 2.21966 8.18584 2.21966 9.66302C2.21966 11.6439 3.00654 13.5436 4.40721 14.9442C5.80787 16.3449 7.70758 17.1318 9.68841 17.1318C11.1656 17.1318 12.6096 16.6937 13.8378 15.8731C15.0661 15.0524 16.0233 13.8859 16.5886 12.5212C17.1539 11.1565 17.3018 9.65474 17.0137 8.20594C16.7255 6.75714 16.0141 5.42634 14.9696 4.38182C13.9251 3.33729 12.5943 2.62596 11.1455 2.33778C9.6967 2.0496 8.19498 2.1975 6.83024 2.76279C5.46551 3.32809 4.29905 4.28538 3.47837 5.51361Z"
            fill="#2D2D2D"
            stroke="#2D2D2D"
            stroke-width="0.5"
          />
          <path
            d="M10.0938 9.00781V9.25781H10.3438H13.625C13.7327 9.25781 13.8361 9.30061 13.9123 9.3768C13.9884 9.45299 14.0312 9.55632 14.0312 9.66406C14.0312 9.77181 13.9884 9.87514 13.9123 9.95132C13.8361 10.0275 13.7327 10.0703 13.625 10.0703H10.3438H10.0938V10.3203V13.6016C10.0938 13.7093 10.0509 13.8126 9.97476 13.8888C9.89858 13.965 9.79525 14.0078 9.6875 14.0078C9.57975 14.0078 9.47642 13.965 9.40024 13.8888C9.32405 13.8126 9.28125 13.7093 9.28125 13.6016V10.3203V10.0703H9.03125H5.75C5.64226 10.0703 5.53892 10.0275 5.46274 9.95132C5.38655 9.87514 5.34375 9.77181 5.34375 9.66406C5.34375 9.55632 5.38655 9.45299 5.46274 9.3768C5.53892 9.30061 5.64226 9.25781 5.75 9.25781H9.03125H9.28125V9.00781V5.72656C9.28125 5.61882 9.32405 5.51549 9.40024 5.4393C9.47642 5.36311 9.57976 5.32031 9.6875 5.32031C9.79524 5.32031 9.89858 5.36311 9.97476 5.4393C10.0509 5.51549 10.0938 5.61882 10.0938 5.72656V9.00781Z"
            fill="#2D2D2D"
            stroke="#2D2D2D"
            stroke-width="0.5"
          />
        </svg>
      </button>
    </ColorsInjector>
  );
};

const ArrowsProgress = ({ arrowProps, current, max, settings }) => {
  return (
    <div className={styles.arrowsProgress}>
      <Arrow {...arrowProps.prev} />
      <ProgressNumbers maxValue={max} value={current + 1} />
      <Arrow {...arrowProps.next} />
    </div>
  );
};

const ModalSliderContent = ({
  data,
  settings,
  initialIndex,
  onIndexChange,
}) => {
  const { swiperProps, arrowProps } = useSwiperNavigation({
    type: settings.modalSliderArrowType,
  });

  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const handleRealIndexChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
    onIndexChange(swiper.realIndex);
  };

  return (
    <div className={styles.modalSliderContent}>
      <Swiper
        rewind
        className={styles.swiper}
        initialSlide={initialIndex}
        onRealIndexChange={handleRealIndexChange}
        slidesPerView={"auto"}
        spaceBetween={40}
        {...swiperProps}
      >
        {data.map(({ photo, area, _id }, index) => (
          <SwiperSlide key={_id ?? index}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {area && (
                <Typography
                  as={"div"}
                  {...settings.modalSliderArea}
                  className={styles.modalSliderArea}
                >
                  {area}
                </Typography>
              )}
              <img
                style={{
                  width: "auto",
                }}
                src={photo}
                alt=""
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <ArrowsProgress
        arrowProps={arrowProps}
        current={activeIndex}
        settings={settings}
        max={data.length}
      />
    </div>
  );
};

const ModalSlider = ({
  data,
  isOpen,
  overlayTheme,
  settings,
  initialIndex = 0,
  onIndexChange,
  onClose,
}) => {
  return (
    <Modal
      overlayTheme={overlayTheme}
      isOpen={isOpen}
      withCloseButton
      onClose={onClose}
    >
      <ModalSliderContent
        data={data}
        settings={settings}
        initialIndex={initialIndex}
        onIndexChange={onIndexChange}
      />
    </Modal>
  );
};

const RoomBlock = ({
  isMinLaptop,
  title,
  description,
  characteristics,
  advantages,
  plans,
  interiors = [],
  staticTexts,
  initedPlanIndex,
  settings,
}) => {
  const [isModalPlansOpened, setModalPlansOpened] = useState(false);
  const [isModalInteriorsOpened, setModalInteriorsOpened] = useState(false);

  const { swiperProps, arrowProps, goTo } = useSwiperNavigation({
    type: settings.plansArrowType,
    arrowClassName: styles.arrow,
  });
  const [activePlanIndex, setActivePlanIndex] = useState(initedPlanIndex);

  const handleModalPlansOpen = () => setModalPlansOpened(true);
  const handleInteriorsModalOpen = () => setModalInteriorsOpened(true);

  const handlePlansModalClose = () => setModalPlansOpened(false);
  const handleInteriorsModalClose = () => setModalInteriorsOpened(false);

  const handleActiveIndexChange = (swiper) =>
    setActivePlanIndex(swiper.realIndex);

  const handleModalActiveIndexChange = (index) => goTo(index);

  const activePlan = plans[activePlanIndex];

  return (
    <>
      <ColorsInjector background={settings.blockBackgroundColor}>
        <div
          style={{
            borderRadius: settings.blockBorderRadius,
          }}
          className={styles.roomTabContent}
        >
          <div className={styles.roomTabContentGrid}>
            <div className={styles.roomLeft}>
              <Typography
                as={"h3"}
                {...settings.blockTitle}
                className={styles.roomTitle}
              >
                {title}
              </Typography>
              {description && (
                <Typography
                  as={"p"}
                  {...settings.blockDescription}
                  className={styles.roomDescription}
                >
                  {description}
                </Typography>
              )}
              <ul className={styles.roomCharacteristics}>
                {characteristics.map(({ title, value, _id }, index) => (
                  <li className={styles.roomCharacteristic} key={_id ?? index}>
                    <Typography
                      as={"h5"}
                      {...settings.blockCharacteristicTitle}
                    >
                      {title}
                    </Typography>
                    {isMinLaptop && (
                      <ColorsInjector
                        background={settings.blockCharacteristicSeparatorColor}
                      >
                        <div className={styles.roomCharacteristicSeparator} />
                      </ColorsInjector>
                    )}
                    <Typography
                      as={"span"}
                      {...settings.blockCharacteristicValue}
                    >
                      {value}
                    </Typography>
                  </li>
                ))}
              </ul>
              <ColorsInjector borderColor={settings.blockAdvantagesBorderColor}>
                <ui className={styles.roomAdvantages}>
                  {advantages.map(({ icon, title, _id }, index) => (
                    <li className={styles.roomAdvantage} key={_id ?? index}>
                      <div className={styles.roomAdvantageIconWrapper}>
                        <img src={icon} alt="" />
                      </div>
                      <Typography as={"span"} {...settings.blockAdvantageTitle}>
                        {title}
                      </Typography>
                    </li>
                  ))}
                </ui>
              </ColorsInjector>
            </div>
            <div className={styles.roomRight}>
              <div className={styles.roomRightContent}>
                <Typography
                  {...settings.blockPlansTotalAreaValue}
                  as={"p"}
                  className={styles.roomPlansTotalArea}
                >
                  {activePlan.area}
                </Typography>
                <Typography as={"h4"} {...settings.blockPlansTotalAreaTitle}>
                  {staticTexts.totalArea}
                </Typography>
                <div className={styles.roomPlansSliderWrapper}>
                  <Swiper
                    rewind
                    {...swiperProps}
                    slidesPerView={"auto"}
                    initialSlide={initedPlanIndex}
                    onRealIndexChange={handleActiveIndexChange}
                    spaceBetween={30}
                  >
                    {plans.map(({ photo, _id }, index) => (
                      <SwiperSlide key={_id ?? index}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            width: "100%",
                          }}
                        >
                          <img
                            onClick={handleModalPlansOpen}
                            className={styles.roomPlanPhoto}
                            src={photo}
                            alt=""
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                {!isMinLaptop && (
                  <div className={styles.planMobileControls}>
                    <ArrowsProgress
                      arrowProps={arrowProps}
                      current={activePlanIndex}
                      max={plans.length}
                      settings={settings}
                    />
                    <div className={styles.detailsZoomMobile}>
                      <Button
                        type={settings.pdfButtonType}
                        label={staticTexts.details}
                      />
                      <Zoom
                        settings={settings}
                        onClick={handleModalPlansOpen}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.roomTabContentBot}>
            <div className={styles.roomButtonsWrapper}>
              <Button
                type={settings.roomReserveButtonType}
                label={staticTexts.reserve}
              />
              {interiors.length > 0 && (
                <Button
                  type={settings.roomInteriorsButtonType}
                  onClick={handleInteriorsModalOpen}
                  label={staticTexts.interiors}
                />
              )}
              {isMinLaptop && (
                <div className={styles.botLeft}>
                  <ArrowsProgress
                    arrowProps={arrowProps}
                    current={activePlanIndex}
                    max={plans.length}
                    settings={settings}
                  />
                  <Button
                    type={settings.pdfButtonType}
                    label={staticTexts.details}
                  />
                  <Zoom settings={settings} onClick={handleModalPlansOpen} />
                </div>
              )}
            </div>
          </div>
        </div>
      </ColorsInjector>
      <ModalSlider
        overlayTheme={settings.section.theme}
        isOpen={isModalPlansOpened}
        onClose={handlePlansModalClose}
        initialIndex={activePlanIndex}
        data={plans}
        onIndexChange={handleModalActiveIndexChange}
        settings={settings}
      />
      {interiors.length > 0 && (
        <ModalSlider
          overlayTheme={settings.section.theme}
          isOpen={isModalInteriorsOpened}
          onClose={handleInteriorsModalClose}
          data={interiors}
          settings={settings}
        />
      )}
    </>
  );
};

const Planning = ({
  title,
  subTitle,
  rooms,
  settings,
  goToMarketLink,
  staticTexts,
  initedRoomIndex,
  initedPlanIndex,
}) => {
  const isMinLaptop = useMediaQuery(mediaQueries.minLaptop);
  const [activeRoomIndex, setActiveRoomIndex] = useState(initedRoomIndex ?? 0);

  const handleActiveRoomChange = (index) => setActiveRoomIndex(index);
  return (
    <Section {...settings.section}>
      <ContentContainer>
        {subTitle && (
          <Typography
            as={"h3"}
            {...settings.subTitle}
            className={styles.subTitle}
          >
            {subTitle}
          </Typography>
        )}
        <Typography as={"h2"} {...settings.title} className={styles.title}>
          {title}
        </Typography>
        <Tabs.Root
          onValueChange={handleActiveRoomChange}
          value={activeRoomIndex}
          className={styles.roomTabs}
        >
          <Tabs.List className={styles.roomTabsList}>
            {rooms.map(({ _id, roomTitle }, index) => (
              <Tabs.Trigger
                className={styles.roomTabTrigger}
                value={index}
                key={_id ?? index}
              >
                <Typography
                  as={"span"}
                  {...settings.roomTitle}
                  color={
                    index === activeRoomIndex
                      ? settings.roomTitleActiveColor
                      : settings.roomTitle.color
                  }
                >
                  {roomTitle}
                </Typography>
                <ColorsInjector background={settings.roomLineActiveColor}>
                  <div
                    data-is-active={index === activeRoomIndex}
                    className={styles.line}
                  />
                </ColorsInjector>
              </Tabs.Trigger>
            ))}
            <ColorsInjector background={settings.roomLineColor}>
              <div className={styles.lineFull} />
            </ColorsInjector>
          </Tabs.List>

          {rooms.map(({ _id, ...roomBlockProps }, index) => (
            <Tabs.Content value={index} key={_id ?? index}>
              <RoomBlock
                index={index}
                isMinLaptop={isMinLaptop}
                {...roomBlockProps}
                staticTexts={staticTexts}
                settings={settings}
                initedPlanIndex={
                  index === initedRoomIndex ? initedPlanIndex : 0
                }
              />
            </Tabs.Content>
          ))}
        </Tabs.Root>
        <div className={styles.goToMarketButtonWrapper}>
          <Button
            label={staticTexts.goToMarket}
            href={goToMarketLink}
            type={settings.goToMarketButtonType}
          />
        </div>
      </ContentContainer>
    </Section>
  );
};

export const PlanningStaticContainer = ({ staticTexts = {}, ...props }) => {
  const t = useTranslation();

  return (
    <Planning
      {...props}
      staticTexts={{
        goToMarket: staticTexts.gotToMarket || t("PLANNING_GO_TO_MARKET"),
        reserve: staticTexts.reserve || t("PLANNING_RESERVE"),
        interiors: staticTexts.interiors || t("PLANNING_INTERIORS"),
        totalArea: staticTexts.totalArea || t("PLANNING_TOTAL_AREA"),
        details: staticTexts.details || t("PLANNING_DETAILS"),
      }}
    />
  );
};

export const PlanningInitedPlanContainer = ({
  initedRoomIndex = 0,
  initedPlanIndex = 0,
  ...props
}) => {
  return (
    <PlanningStaticContainer
      initedPlanIndex={initedPlanIndex}
      initedRoomIndex={initedRoomIndex}
      {...props}
    />
  );
};
