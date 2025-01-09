use anchor_lang::prelude::*;

#[account]
pub struct Treasury {
    pub authority: Pubkey,
    pub bump: u8,
    pub total_claimed: u64,
}

#[account]
pub struct UserProgress {
    pub user: Pubkey,
    pub has_claimed: [bool; 13], // 13 个练习的领取状态
    pub total_claimed: u64,
}
