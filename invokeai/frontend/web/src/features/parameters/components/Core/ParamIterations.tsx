import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvNumberInput } from 'common/components/InvNumberInput/InvNumberInput';
import { setIterations } from 'features/parameters/store/generationSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const selector = createMemoizedSelector([stateSelector], (state) => {
  const { initial, min, sliderMax, inputMax, fineStep, coarseStep } =
    state.config.sd.iterations;
  const { iterations } = state.generation;

  return {
    iterations,
    initial,
    min,
    sliderMax,
    inputMax,
    step: coarseStep,
    fineStep,
  };
});

const ParamIterations = () => {
  const { iterations, initial, min, sliderMax, inputMax, step, fineStep } =
    useAppSelector(selector);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleChange = useCallback(
    (v: number) => {
      dispatch(setIterations(v));
    },
    [dispatch]
  );

  const handleReset = useCallback(() => {
    dispatch(setIterations(initial));
  }, [dispatch, initial]);

  return (
    <InvNumberInput
      step={step}
      fineStep={fineStep}
      min={1}
      max={999}
      onChange={handleChange}
      value={iterations}
      h="full"
      w="216px"
      numberInputFieldProps={{
        ps: '144px',
        borderInlineStartRadius: 'base',
        h: 'full',
        textAlign: 'center',
      }}
    />
  );
  // return (
  //   <InvControl label={t('parameters.iterations')} feature="paramIterations">
  //     <InvNumberInput
  //       step={step}
  //       fineStep={fineStep}
  //       min={min}
  //       max={inputMax}
  //       onChange={handleChange}
  //       value={iterations}
  //     />
  //   </InvControl>
  // );
};

export default memo(ParamIterations);
