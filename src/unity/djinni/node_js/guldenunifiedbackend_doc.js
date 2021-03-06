// AUTOGENERATED FILE - DO NOT MODIFY!
// This file generated by Djinni

/** This interface will be implemented in C++ and can be called from any language. */
declare class NJSGuldenUnifiedBackend
{
    /** Get the build information (ie. commit id and status) */
    static declare function BuildInfo(): string;
    /**
     * Start the library
     * extraArgs - any additional commandline arguments as passed to GuldenD
     * NB!!! This call blocks until the library is terminated, it is the callers responsibility to place it inside a thread or similar.
     * If you are in an environment where this is not possible (node.js for example use InitUnityLibThreaded instead which places it in a thread on your behalf)
     */
    static declare function InitUnityLib(data_dir: string, staticFilterPath: string, staticFilterOffset: number, staticFilterLength: number, testnet: boolean, spvMode: boolean, signalHandler: NJSGuldenUnifiedFrontend, extraArgs: string): number;
    /** Threaded implementation of InitUnityLib */
    static declare function InitUnityLibThreaded(data_dir: string, staticFilterPath: string, staticFilterOffset: number, staticFilterLength: number, testnet: boolean, spvMode: boolean, signalHandler: NJSGuldenUnifiedFrontend, extraArgs: string);
    /** Create the wallet - this should only be called after receiving a `notifyInit...` signal from InitUnityLib */
    static declare function InitWalletFromRecoveryPhrase(phrase: string, password: string): boolean;
    /** Continue creating wallet that was previously erased using EraseWalletSeedsAndAccounts */
    static declare function ContinueWalletFromRecoveryPhrase(phrase: string, password: string): boolean;
    /** Create the wallet - this should only be called after receiving a `notifyInit...` signal from InitUnityLib */
    static declare function InitWalletLinkedFromURI(linked_uri: string, password: string): boolean;
    /** Continue creating wallet that was previously erased using EraseWalletSeedsAndAccounts */
    static declare function ContinueWalletLinkedFromURI(linked_uri: string, password: string): boolean;
    /** Create the wallet - this should only be called after receiving a `notifyInit...` signal from InitUnityLib */
    static declare function InitWalletFromAndroidLegacyProtoWallet(wallet_file: string, old_password: string, new_password: string): boolean;
    /** Check if a file is a valid legacy proto wallet */
    static declare function isValidAndroidLegacyProtoWallet(wallet_file: string, old_password: string): LegacyWalletResult;
    /** Check link URI for validity */
    static declare function IsValidLinkURI(phrase: string): boolean;
    /** Replace the existing wallet accounts with a new one from a linked URI - only after first emptying the wallet. */
    static declare function ReplaceWalletLinkedFromURI(linked_uri: string, password: string): boolean;
    /**
     * Erase the seeds and accounts of a wallet leaving an empty wallet (with things like the address book intact)
     * After calling this it will be necessary to create a new linked account or recovery phrase account again.
     * NB! This will empty a wallet regardless of whether it has funds in it or not and makes no provisions to check for this - it is the callers responsibility to ensure that erasing the wallet is safe to do in this regard.
     */
    static declare function EraseWalletSeedsAndAccounts(): boolean;
    /**
     * Check recovery phrase for (syntactic) validity
     * Considered valid if the contained mnemonic is valid and the birth-number is either absent or passes Base-10 checksum
     */
    static declare function IsValidRecoveryPhrase(phrase: string): boolean;
    /** Generate a new recovery mnemonic */
    static declare function GenerateRecoveryMnemonic(): string;
    /** Compute recovery phrase with birth number */
    static declare function ComposeRecoveryPhrase(mnemonic: string, birthTime: number): string;
    /** Stop the library */
    static declare function TerminateUnityLib();
    /** Generate a QR code for a string, QR code will be as close to width_hint as possible when applying simple scaling. */
    static declare function QRImageFromString(qr_string: string, width_hint: number): QrCodeRecord;
    /** Get a receive address from the wallet */
    static declare function GetReceiveAddress(): string;
    /** Get the recovery phrase for the wallet */
    static declare function GetRecoveryPhrase(): string;
    /** Check if the wallet is using a mnemonic seed ie. recovery phrase (else it is a linked wallet) */
    static declare function IsMnemonicWallet(): boolean;
    /** Check if the phrase mnemonic is a correct one for the wallet (phrase can be with or without birth time) */
    static declare function IsMnemonicCorrect(phrase: string): boolean;
    /** Unlock wallet */
    static declare function UnlockWallet(password: string): boolean;
    /** Forcefully lock wallet again */
    static declare function LockWallet(): boolean;
    /** Change the waller password */
    static declare function ChangePassword(oldPassword: string, newPassword: string): boolean;
    /** Check if the wallet has any transactions that are still pending confirmation, to be used to determine if e.g. it is safe to perform a link or whether we should wait. */
    static declare function HaveUnconfirmedFunds(): boolean;
    /** Check current wallet balance (including unconfirmed funds) */
    static declare function GetBalance(): number;
    /** Rescan blockchain for wallet transactions */
    static declare function DoRescan();
    /** Check if text/address is something we are capable of sending money too */
    static declare function IsValidRecipient(request: UriRecord): UriRecipient;
    /** Compute the fee required to send amount to given recipient */
    static declare function feeForRecipient(request: UriRecipient): number;
    /** Attempt to pay a recipient, will throw on failure with description */
    static declare function performPaymentToRecipient(request: UriRecipient, substract_fee: boolean): PaymentResultStatus;
    /** Get list of all transactions wallet has been involved in */
    static declare function getTransactionHistory(): Array<TransactionRecord>;
    /**
     * Get the wallet transaction for the hash
     * Will throw if not found
     */
    static declare function getTransaction(txHash: string): TransactionRecord;
    /** Get list of wallet mutations */
    static declare function getMutationHistory(): Array<MutationRecord>;
    /** Get list of all address book entries */
    static declare function getAddressBookRecords(): Array<AddressRecord>;
    /** Add a record to the address book */
    static declare function addAddressBookRecord(address: AddressRecord);
    /** Delete a record from the address book */
    static declare function deleteAddressBookRecord(address: AddressRecord);
    /** Interim persist and prune of state. Use at key moments like app backgrounding. */
    static declare function PersistAndPruneForSPV();
    /**
     * Reset progress notification. In cases where there has been no progress for a long time, but the process
     * is still running the progress can be reset and will represent work to be done from this reset onwards.
     * For example when the process is in the background on iOS for a long long time (but has not been terminated
     * by the OS) this might make more sense then to continue the progress from where it was a day or more ago.
     */
    static declare function ResetUnifiedProgress();
    /** Get connected peer info */
    static declare function getPeers(): Array<PeerRecord>;
    /** Get info of last blocks (at most 32) in SPV chain */
    static declare function getLastSPVBlockInfos(): Array<BlockInfoRecord>;
    static declare function getUnifiedProgress(): number;
    static declare function getMonitoringStats(): MonitorRecord;
    static declare function RegisterMonitorListener(listener: NJSGuldenMonitorListener);
    static declare function UnregisterMonitorListener(listener: NJSGuldenMonitorListener);
}
/** Interface to receive events from the core */
declare class NJSGuldenUnifiedFrontend
{
    /**
     * Fraction of work done since session start or last progress reset [0..1]
     * Unified progress combines connection state, header and block sync
     */
    declare function notifyUnifiedProgress(progress: number);
    declare function notifyBalanceChange(new_balance: BalanceRecord);
    /**
     * Notification of new mutations.
     * If self_committed it is due to a call to performPaymentToRecipient, else it is because of a transaction
     * reached us in another way. In general this will be because we received funds from someone, hower there are
     * also cases where funds is send from our wallet while !self_committed (for example by a linked desktop wallet
     * or another wallet instance using the same keys as ours).
     */
    declare function notifyNewMutation(mutation: MutationRecord, self_committed: boolean);
    declare function notifyUpdatedTransaction(transaction: TransactionRecord);
    declare function notifyInitWithExistingWallet();
    declare function notifyInitWithoutExistingWallet();
    declare function notifyShutdown();
    declare function notifyCoreReady();
    declare function logPrint(str: string);
}
/** Monitoring events */
declare class NJSGuldenMonitorListener
{
    declare function onPartialChain(height: number, probable_height: number, offset: number);
    declare function onPruned(height: number);
    declare function onProcessedSPVBlocks(height: number);
}
