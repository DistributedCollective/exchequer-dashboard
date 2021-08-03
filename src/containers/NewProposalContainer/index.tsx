import React, { useCallback, useMemo, useState } from 'react';
import cn from 'classnames';
import { Button } from '../../components/Button';
import { Dialog } from '../../components/Dialog';
import { Stepper } from '../../components/Stepper';
import { Input } from '../../components/Input';
import { Legend } from '../../components/Legend';
import { FormGroup } from '../../components/FormGroup';

type AccountType = 'viewing' | 'monitoring';

type FormState = {
  name: string;
  address: string;
  chainId: number;
  exchange: string;
  exchangeKey: string;
  asset: string;
  threshold: string;
};

export function NewProposalContainer() {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<AccountType>('viewing');
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<FormState>({
    name: '',
    address: '',
    chainId: 30,
    exchange: '',
    exchangeKey: '',
    asset: '',
    threshold: '',
  });

  const stepCount = useMemo(() => (type === 'monitoring' ? 3 : 2), [type]);

  const handleSubmit = useCallback(() => {
    // todo post data to the endpoint.
  }, []);

  const handleTypeChange = useCallback(
    (newType: AccountType) => {
      if (step === 3 && newType === 'viewing') {
        setStep(2);
      }
      setType(newType);
    },
    [step],
  );

  const handleBackButton = useCallback(() => {
    if (step === 1) {
      setIsOpen(false);
    } else {
      setStep(step - 1);
    }
  }, [step]);

  const handleNextButton = useCallback(() => {
    if (step === stepCount) {
      handleSubmit();
    } else {
      setStep(step + 1);
    }
  }, [stepCount, step, handleSubmit]);

  const updateForm = useCallback(
    (key: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;
      setForm(prevState => ({
        ...prevState,
        [key]: value,
      }));
    },
    [],
  );

  const isFormValid = useMemo(() => {
    return (
      [
        form.name.length > 3, //
        form.address.length === 42 ||
          (form.exchange.length > 0 && form.exchangeKey.length > 0), // wallet address or exchange info must be set
        ...(type === 'monitoring'
          ? [form.asset.length > 0, form.threshold.length > 0]
          : []),
      ].filter(item => !item).length === 0
    );
  }, [form, type]);

  return (
    <>
      <Button text="Add Account" onClick={() => setIsOpen(true)} primary />
      <Dialog isOpen={isOpen} className="dialog--container__mini">
        <Stepper value={step} count={stepCount} />

        <div className="flex flex-row justify-between space-x-4 items-center mt-16 mb-10">
          <Button
            text="Viewing"
            onClick={() => handleTypeChange('viewing')}
            className={cn(
              'w-full border border-light text-lg rounded-full bg-light bg-opacity-25 transition duration-300',
              type !== 'viewing' && 'opacity-25',
            )}
          />
          <Button
            text="Monitoring"
            className={cn(
              'w-full border border-light text-lg rounded-full bg-light bg-opacity-25 transition duration-300',
              type !== 'monitoring' && 'opacity-25',
            )}
            onClick={() => handleTypeChange('monitoring')}
          />
        </div>

        {step === 1 && (
          <>
            <h2 className="text-lg font-semibold mb-4">Account Info</h2>
            <FormGroup label="Account Name">
              <Input value={form.name} onChange={updateForm('name')} />
            </FormGroup>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-lg font-semibold mb-4">Account Address</h2>
            <p>Fill one of the following if applicable</p>
            <Legend title="Wallet" className="mt-10 mb-4" />
            <FormGroup label="Wallet Address">
              <Input value={form.address} onChange={updateForm('address')} />
            </FormGroup>
            <Legend title="Exchange" className="mt-10 mb-4" />
            <FormGroup label="Exchange API Url">
              <Input value={form.exchange} onChange={updateForm('exchange')} />
            </FormGroup>
            <FormGroup label="Exchange API Key">
              <Input
                value={form.exchangeKey}
                onChange={updateForm('exchangeKey')}
              />
            </FormGroup>
          </>
        )}

        {step === 3 && type === 'monitoring' && (
          <>
            <h2 className="text-lg font-semibold mb-4">Asset Info</h2>
            <FormGroup label="Asset Name">
              <Input value={form.asset} onChange={updateForm('asset')} />
            </FormGroup>
            <FormGroup label="Asset Balance Threshold">
              <Input
                value={form.threshold}
                onChange={updateForm('threshold')}
              />
            </FormGroup>
          </>
        )}

        <div className="flex flex-row justify-between items-center space-x-4 mt-16">
          <div className="w-1/2 text-center">
            <Button text="Back" onClick={handleBackButton} secondary />
          </div>
          <div className="w-1/2 text-right">
            <Button
              text={step === stepCount ? 'Add' : 'Next'}
              disabled={step === stepCount && !isFormValid}
              onClick={handleNextButton}
              className="w-full"
              primary
            />
          </div>
        </div>
      </Dialog>
    </>
  );
}
