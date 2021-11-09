import React, { useCallback, useMemo, useState } from 'react';
import cn from 'classnames';
import { Button } from '../../components/Button';
import { Dialog } from '../../components/Dialog';
import { Stepper } from '../../components/Stepper';
import { Input } from '../../components/Input';
import { Legend } from '../../components/Legend';
import { FormGroup } from '../../components/FormGroup';
import { httpClient } from '../../utils/http-client';
import { useAuthContext } from '../AuthContainer';
import { bignumber } from 'mathjs';
import { Select } from '../../components/Select';
import { Checkbox } from '../../components/Checkbox';

type AccountType = 'view' | 'monitor';

type FormState = {
  walletName: string;
  address: string;
  chainId: number;
  exchangeName: string;
  assetName: string;
  assetContractAddress: string;
  assetDecimals: number;
  threshold: string;
  isLpTokensOwner: boolean;
};

export function NewProposalContainer() {
  const { address, onStateRefreshed } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<AccountType>('view');
  const [step, setStep] = useState<number>(1);
  const [errors, setErrors] = useState<string[]>([]);
  const [form, setForm] = useState<FormState>({
    walletName: '',
    address: '',
    chainId: 30,
    exchangeName: '',
    assetName: '',
    assetContractAddress: '',
    assetDecimals: 18,
    threshold: '',
    isLpTokensOwner: false,
  });

  const stepCount = useMemo(() => (type === 'monitor' ? 3 : 2), [type]);

  const handleSubmit = useCallback(() => {
    setErrors([]);

    const value: Record<string, any> = {
      walletName: form.walletName,
      address: form.address,
      chainId: form.chainId,
      adminAddress: address,
      exchangeName: form.exchangeName,
      isLpTokensOwner: form.isLpTokensOwner,
    };

    if (type === 'monitor') {
      value['assetName'] = form.assetName;
      value['assetDecimals'] = form.assetDecimals;
      value['assetContractAddress'] =
        form.assetContractAddress ||
        '0x0000000000000000000000000000000000000000';
      value['threshold'] = bignumber(form.threshold)
        .mul(10 ** form.assetDecimals)
        .toString();
    }

    if (!value['exchangeName']) {
      delete value['exchangeName'];
    }

    httpClient
      .post(`wallet/${type}`, value)
      .then(() => {
        onStateRefreshed(new Date());
        setIsOpen(false);
        setForm({
          walletName: '',
          address: '',
          chainId: 30,
          exchangeName: '',
          assetName: '',
          assetContractAddress: '',
          assetDecimals: 18,
          threshold: '',
          isLpTokensOwner: false,
        });
        setStep(1);
      })
      .catch(error => {
        if (error?.error?.errors) {
          setErrors(error?.error?.errors || [error.message]);
        } else {
          setErrors([error.message]);
        }
      });
  }, [type, form, address, onStateRefreshed]);

  const handleTypeChange = useCallback(
    (newType: AccountType) => {
      if (step === 3 && newType === 'view') {
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
      const value =
        event.currentTarget.type === 'checkbox'
          ? event.currentTarget.checked
          : event.currentTarget.value;
      setForm(prevState => ({
        ...prevState,
        [key]: value,
      }));
    },
    [],
  );

  const updateSelect = useCallback(
    (key: keyof FormState) => (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.currentTarget.value;
      setForm(prevState => ({
        ...prevState,
        [key]: value,
      }));
    },
    [],
  );

  const isFormValid = useMemo(() => {
    if (step === 1) {
      return form.walletName.length > 3;
    }

    if (step === 2) {
      return (
        [
          (form.address.length === 42 && form.chainId) ||
            form.exchangeName.length > 0, // wallet address and chainId or exchange info must be set
          !(form.address.length > 0 && form.exchangeName.length > 0), // make sure exchange name and address is not entered both
        ].filter(item => !item).length === 0
      );
    }

    if (step === 3 && type === 'monitor') {
      return (
        [form.assetName.length > 0, form.threshold.length > 0].filter(
          item => !item,
        ).length === 0
      );
    }

    return true;
  }, [form, type, step]);

  return (
    <>
      <Button text="Add Account" onClick={() => setIsOpen(true)} primary />
      <Dialog isOpen={isOpen} className="dialog--container__mini">
        <Stepper value={step} count={stepCount} />

        <div className="flex flex-row justify-between space-x-4 items-center mt-16 mb-10">
          <Button
            text="Viewing"
            onClick={() => handleTypeChange('view')}
            className={cn(
              'w-full border border-light text-lg rounded-full bg-light bg-opacity-25 transition duration-300',
              type !== 'view' && 'opacity-25',
            )}
          />
          <Button
            text="Monitoring"
            className={cn(
              'w-full border border-light text-lg rounded-full bg-light bg-opacity-25 transition duration-300',
              type !== 'monitor' && 'opacity-25',
            )}
            onClick={() => handleTypeChange('monitor')}
          />
        </div>

        {step === 1 && (
          <>
            <h2 className="text-lg font-semibold mb-4">Account Info</h2>
            <FormGroup label="Account Name">
              <Input
                value={form.walletName}
                onChange={updateForm('walletName')}
              />
            </FormGroup>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-lg font-semibold mb-4">Account Details</h2>
            <p>Fill in the details below, if applicable</p>
            <Legend title="Account" className="mt-10 mb-4" />
            <FormGroup label="Account Address">
              <Input value={form.address} onChange={updateForm('address')} />
            </FormGroup>
            <Checkbox
              checked={form.isLpTokensOwner}
              onChange={updateForm('isLpTokensOwner')}
              label="Owns LP Tokens"
            />
            <FormGroup label="Network">
              <Select value={form.chainId} onChange={updateSelect('chainId')}>
                <option value={30}>RSK</option>
                <option value={1}>Ethereum</option>
                <optgroup label="Testnets">
                  <option value={31}>RSK testnet</option>
                </optgroup>
              </Select>
            </FormGroup>
            <Legend title="Exchange" className="mt-10 mb-4" />
            <FormGroup label="Exchange Name">
              <Select
                value={form.exchangeName}
                onChange={updateSelect('exchangeName')}
              >
                <option value="">- N/A</option>
                <option value="bitfinex">Bitfinex</option>
                <option value="kucoin">Kucoin</option>
                <option value="gate">Gate</option>
                <option value="ascendex">Ascendex</option>
              </Select>
            </FormGroup>
          </>
        )}

        {step === 3 && type === 'monitor' && (
          <>
            <h2 className="text-lg font-semibold mb-4">Asset Info</h2>
            <FormGroup label="Asset Symbol (SOV)">
              <Input
                value={form.assetName}
                onChange={updateForm('assetName')}
              />
            </FormGroup>
            <FormGroup label="Asset Contract Address (if any)">
              <Input
                value={form.assetContractAddress}
                onChange={updateForm('assetContractAddress')}
              />
            </FormGroup>
            <FormGroup label="Asset Decimals">
              <Input
                value={form.assetDecimals}
                onChange={updateForm('assetDecimals')}
              />
            </FormGroup>
            <FormGroup label="Asset Balance Threshold">
              <Input
                value={form.threshold}
                onChange={updateForm('threshold')}
              />
            </FormGroup>
          </>
        )}

        {errors && (
          <ol className="text-red">
            {errors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ol>
        )}

        <div className="flex flex-row justify-between items-center space-x-4 mt-16">
          <div className="w-1/2 text-center">
            <Button text="Back" onClick={handleBackButton} secondary />
          </div>
          <div className="w-1/2 text-right">
            <Button
              text={step === stepCount ? 'Add' : 'Next'}
              disabled={!isFormValid}
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
