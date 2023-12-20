import { Flex } from '@chakra-ui/react';
import {
  InvButtonGroup,
  InvIconButton,
  InvMenu,
  InvMenuButton,
  InvMenuList,
} from 'common/components/';
import { skipToken } from '@reduxjs/toolkit/query';
import { useAppToaster } from 'app/components/Toaster';
import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { upscaleRequested } from 'app/store/middleware/listenerMiddleware/listeners/upscaleRequested';
import { stateSelector } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { DeleteImageButton } from 'features/deleteImageModal/components/DeleteImageButton';
import { imagesToDeleteSelected } from 'features/deleteImageModal/store/slice';
import SingleSelectionMenuItems from 'features/gallery/components/ImageContextMenu/SingleSelectionMenuItems';
import { sentImageToImg2Img } from 'features/gallery/store/actions';
import ParamUpscalePopover from 'features/parameters/components/Upscale/ParamUpscaleSettings';
import { useRecallParameters } from 'features/parameters/hooks/useRecallParameters';
import { initialImageSelected } from 'features/parameters/store/actions';
import { useIsQueueMutationInProgress } from 'features/queue/hooks/useIsQueueMutationInProgress';
import { useFeatureStatus } from 'features/system/hooks/useFeatureStatus';
import { activeTabNameSelector } from 'features/ui/store/uiSelectors';
import {
  setShouldShowImageDetails,
  setShouldShowProgressInViewer,
} from 'features/ui/store/uiSlice';
import { useGetAndLoadEmbeddedWorkflow } from 'features/workflowLibrary/hooks/useGetAndLoadEmbeddedWorkflow';
import { memo, useCallback } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useTranslation } from 'react-i18next';
import {
  FaAsterisk,
  FaCode,
  FaHourglassHalf,
  FaQuoteRight,
  FaRulerVertical,
  FaSeedling,
} from 'react-icons/fa';
import { FaCircleNodes, FaEllipsis } from 'react-icons/fa6';
import { useGetImageDTOQuery } from 'services/api/endpoints/images';
import { useDebouncedMetadata } from 'services/api/hooks/useDebouncedMetadata';

const currentImageButtonsSelector = createMemoizedSelector(
  [stateSelector, activeTabNameSelector],
  ({ gallery, system, ui, config }, activeTabName) => {
    const { isConnected, shouldConfirmOnDelete, denoiseProgress } = system;

    const {
      shouldShowImageDetails,
      shouldHidePreview,
      shouldShowProgressInViewer,
    } = ui;

    const { shouldFetchMetadataFromApi } = config;

    const lastSelectedImage = gallery.selection[gallery.selection.length - 1];

    return {
      shouldConfirmOnDelete,
      isConnected,
      shouldDisableToolbarButtons:
        Boolean(denoiseProgress?.progress_image) || !lastSelectedImage,
      shouldShowImageDetails,
      activeTabName,
      shouldHidePreview,
      shouldShowProgressInViewer,
      lastSelectedImage,
      shouldFetchMetadataFromApi,
    };
  }
);

const CurrentImageButtons = () => {
  const dispatch = useAppDispatch();
  const {
    isConnected,
    shouldDisableToolbarButtons,
    shouldShowImageDetails,
    lastSelectedImage,
    shouldShowProgressInViewer,
  } = useAppSelector(currentImageButtonsSelector);

  const isUpscalingEnabled = useFeatureStatus('upscaling').isFeatureEnabled;
  const isQueueMutationInProgress = useIsQueueMutationInProgress();
  const toaster = useAppToaster();
  const { t } = useTranslation();

  const {
    recallBothPrompts,
    recallSeed,
    recallWidthAndHeight,
    recallAllParameters,
  } = useRecallParameters();

  const { currentData: imageDTO } = useGetImageDTOQuery(
    lastSelectedImage?.image_name ?? skipToken
  );

  const { metadata, isLoading: isLoadingMetadata } = useDebouncedMetadata(
    lastSelectedImage?.image_name
  );

  const { getAndLoadEmbeddedWorkflow, getAndLoadEmbeddedWorkflowResult } =
    useGetAndLoadEmbeddedWorkflow({});

  const handleLoadWorkflow = useCallback(() => {
    if (!lastSelectedImage || !lastSelectedImage.has_workflow) {
      return;
    }
    getAndLoadEmbeddedWorkflow(lastSelectedImage.image_name);
  }, [getAndLoadEmbeddedWorkflow, lastSelectedImage]);

  useHotkeys('w', handleLoadWorkflow, [lastSelectedImage]);

  const handleClickUseAllParameters = useCallback(() => {
    recallAllParameters(metadata);
  }, [metadata, recallAllParameters]);

  useHotkeys('a', handleClickUseAllParameters, [metadata]);

  const handleUseSeed = useCallback(() => {
    recallSeed(metadata?.seed);
  }, [metadata?.seed, recallSeed]);

  useHotkeys('s', handleUseSeed, [metadata]);

  const handleUsePrompt = useCallback(() => {
    recallBothPrompts(
      metadata?.positive_prompt,
      metadata?.negative_prompt,
      metadata?.positive_style_prompt,
      metadata?.negative_style_prompt
    );
  }, [
    metadata?.negative_prompt,
    metadata?.positive_prompt,
    metadata?.positive_style_prompt,
    metadata?.negative_style_prompt,
    recallBothPrompts,
  ]);

  useHotkeys('p', handleUsePrompt, [metadata]);

  const handleUseSize = useCallback(() => {
    recallWidthAndHeight(metadata?.width, metadata?.height);
  }, [metadata?.width, metadata?.height, recallWidthAndHeight]);

  useHotkeys('d', handleUseSize, [metadata]);

  const handleSendToImageToImage = useCallback(() => {
    dispatch(sentImageToImg2Img());
    dispatch(initialImageSelected(imageDTO));
  }, [dispatch, imageDTO]);

  useHotkeys('shift+i', handleSendToImageToImage, [imageDTO]);

  const handleClickUpscale = useCallback(() => {
    if (!imageDTO) {
      return;
    }
    dispatch(upscaleRequested({ imageDTO }));
  }, [dispatch, imageDTO]);

  const handleDelete = useCallback(() => {
    if (!imageDTO) {
      return;
    }
    dispatch(imagesToDeleteSelected([imageDTO]));
  }, [dispatch, imageDTO]);

  useHotkeys(
    'Shift+U',
    () => {
      handleClickUpscale();
    },
    {
      enabled: () =>
        Boolean(
          isUpscalingEnabled && !shouldDisableToolbarButtons && isConnected
        ),
    },
    [isUpscalingEnabled, imageDTO, shouldDisableToolbarButtons, isConnected]
  );

  const handleClickShowImageDetails = useCallback(
    () => dispatch(setShouldShowImageDetails(!shouldShowImageDetails)),
    [dispatch, shouldShowImageDetails]
  );

  useHotkeys(
    'i',
    () => {
      if (imageDTO) {
        handleClickShowImageDetails();
      } else {
        toaster({
          title: t('toast.metadataLoadFailed'),
          status: 'error',
          duration: 2500,
          isClosable: true,
        });
      }
    },
    [imageDTO, shouldShowImageDetails, toaster]
  );

  useHotkeys(
    'delete',
    () => {
      handleDelete();
    },
    [dispatch, imageDTO]
  );

  const handleClickProgressImagesToggle = useCallback(() => {
    dispatch(setShouldShowProgressInViewer(!shouldShowProgressInViewer));
  }, [dispatch, shouldShowProgressInViewer]);

  return (
    <>
      <Flex
        sx={{
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <InvButtonGroup isDisabled={shouldDisableToolbarButtons}>
          <InvMenu isLazy>
            <InvMenuButton
              as={InvIconButton}
              aria-label={t('parameters.imageActions')}
              tooltip={t('parameters.imageActions')}
              isDisabled={!imageDTO}
              icon={<FaEllipsis />}
            />
            <InvMenuList>
              {imageDTO && <SingleSelectionMenuItems imageDTO={imageDTO} />}
            </InvMenuList>
          </InvMenu>
        </InvButtonGroup>

        <InvButtonGroup isDisabled={shouldDisableToolbarButtons}>
          <InvIconButton
            icon={<FaCircleNodes />}
            tooltip={`${t('nodes.loadWorkflow')} (W)`}
            aria-label={`${t('nodes.loadWorkflow')} (W)`}
            isDisabled={!imageDTO?.has_workflow}
            onClick={handleLoadWorkflow}
            isLoading={getAndLoadEmbeddedWorkflowResult.isLoading}
          />
          <InvIconButton
            isLoading={isLoadingMetadata}
            icon={<FaQuoteRight />}
            tooltip={`${t('parameters.usePrompt')} (P)`}
            aria-label={`${t('parameters.usePrompt')} (P)`}
            isDisabled={!metadata?.positive_prompt}
            onClick={handleUsePrompt}
          />
          <InvIconButton
            isLoading={isLoadingMetadata}
            icon={<FaSeedling />}
            tooltip={`${t('parameters.useSeed')} (S)`}
            aria-label={`${t('parameters.useSeed')} (S)`}
            isDisabled={metadata?.seed === null || metadata?.seed === undefined}
            onClick={handleUseSeed}
          />
          <InvIconButton
            isLoading={isLoadingMetadata}
            icon={<FaRulerVertical />}
            tooltip={`${t('parameters.useSize')} (D)`}
            aria-label={`${t('parameters.useSize')} (D)`}
            isDisabled={
              metadata?.height === null ||
              metadata?.height === undefined ||
              metadata?.width === null ||
              metadata?.width === undefined
            }
            onClick={handleUseSize}
          />
          <InvIconButton
            isLoading={isLoadingMetadata}
            icon={<FaAsterisk />}
            tooltip={`${t('parameters.useAll')} (A)`}
            aria-label={`${t('parameters.useAll')} (A)`}
            isDisabled={!metadata}
            onClick={handleClickUseAllParameters}
          />
        </InvButtonGroup>

        {isUpscalingEnabled && (
          <InvButtonGroup isDisabled={isQueueMutationInProgress}>
            {isUpscalingEnabled && <ParamUpscalePopover imageDTO={imageDTO} />}
          </InvButtonGroup>
        )}

        <InvButtonGroup>
          <InvIconButton
            icon={<FaCode />}
            tooltip={`${t('parameters.info')} (I)`}
            aria-label={`${t('parameters.info')} (I)`}
            isChecked={shouldShowImageDetails}
            onClick={handleClickShowImageDetails}
          />
        </InvButtonGroup>

        <InvButtonGroup>
          <InvIconButton
            aria-label={t('settings.displayInProgress')}
            tooltip={t('settings.displayInProgress')}
            icon={<FaHourglassHalf />}
            isChecked={shouldShowProgressInViewer}
            onClick={handleClickProgressImagesToggle}
          />
        </InvButtonGroup>

        <InvButtonGroup>
          <DeleteImageButton onClick={handleDelete} />
        </InvButtonGroup>
      </Flex>
    </>
  );
};

export default memo(CurrentImageButtons);
