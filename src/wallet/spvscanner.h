// Copyright (c) 2018 The Gulden developers
// Authored by: Willem de Jonge (willem@isnapp.nl)
// Distributed under the GULDEN software license, see the accompanying
// file COPYING

#ifndef SPVSCANNER_H
#define SPVSCANNER_H

#include "../validation/validationinterface.h"

class CWallet;

class CSPVScanner : public CValidationInterface
{
public:
    CSPVScanner(CWallet& _wallet);
    ~CSPVScanner();

    void StartScan();

    CSPVScanner(const CSPVScanner&) = delete;
    CSPVScanner& operator=(const CSPVScanner&) = delete;

protected:
    void HeaderTipChanged(const CBlockIndex* pTip) override;

private:
    CWallet& wallet;

    // timestamp to start block requests, older blocks are known to have no
    // transactions for the wallet
    int64_t startTime;

    // SPV scan processed up to this block
    const CBlockIndex* lastProcessed;

    // Blocks (lastProcessed .. requstTip] have been requested and are pending
    const CBlockIndex* requestTip;

    // Session start height for progress reporting
    int startHeight;

    void RequestBlocks();

    // Update value of lastProcessed to pindex and persist it to the wallet db
    void UpdateLastProcessed(const CBlockIndex* pindex);

    void ProcessPriorityRequest(const std::shared_ptr<const CBlock> &block, const CBlockIndex *pindex);
};

#endif // SPVSCANNER_H
