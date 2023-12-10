import { createContext, useCallback, useMemo, useState } from 'react'

const INITIAL_STATE = {
  name: '',
  description: '',
  industry: '',
  estimatedIncome: 0.0,
  costs: {
    fixed: 0.0,
    variables: 0.0
  },
  production: {
    unitsProduced: 0.0,
    productionCapacity: 0.0
  },
  prices: {
    actualPrice: 0.0,
    newPrice: 0.0
  },
  offerDemand: {
    currentDemand: 0.0,
    newDemand: 0.0,
    currentOffer: 0.0,
    newOffer: 0.0
  }
}

export const EntrepreneurshipContext = createContext({})

export const EntrepreneurshipProvider = ({ children }) => {
  const [entrepreneurship, setEntrepreneurship] = useState(INITIAL_STATE)

  const handleEntrepreneur = useCallback((obj) => {
    setEntrepreneurship(obj)
  }, [setEntrepreneurship])

  const memoedValue = useMemo(() => {
    return { entrepreneurship, handleEntrepreneur }
  }, [entrepreneurship, handleEntrepreneur])

  return <EntrepreneurshipContext.Provider value={memoedValue}>{children}</EntrepreneurshipContext.Provider>
}
