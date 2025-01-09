use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("该练习奖励已经领取过")]
    AlreadyClaimed,
    #[msg("无效的练习ID")]
    InvalidExerciseId,
    #[msg("国库余额不足")]
    InsufficientTreasuryBalance,
}
