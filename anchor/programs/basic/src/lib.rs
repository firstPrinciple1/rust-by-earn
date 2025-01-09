use anchor_lang::prelude::*;

mod error;
mod state;
mod instruction;
mod processor;
mod entrypoint;

use error::*;
use state::*;
use instruction::*;
use processor::*;
use entrypoint::*;

declare_id!("6z68wfurCMYkZG51s1Et9BJEd9nJGUusjHXNt4dGbNNF");

#[program]
pub mod basic {
    use super::*;

    pub fn initialize_treasury(ctx: Context<InitializeTreasury>, bump: u8) -> Result<()> {
        processor::initialize_treasury(ctx, bump)
    }

    pub fn claim_reward(ctx: Context<ClaimReward>, exercise_id: u8) -> Result<()> {
        processor::claim_reward(ctx, exercise_id)
    }

    pub fn deposit_treasury(ctx: Context<DepositTreasury>, amount: u64) -> Result<()> {
        processor::deposit_treasury(ctx, amount)
    }
}

#[event]
pub struct RewardClaimed {
    pub user: Pubkey,
    pub exercise_id: u8,
    pub amount: u64,
    pub timestamp: i64,
}

#[event]
pub struct TreasuryDeposited {
    pub from: Pubkey,
    pub amount: u64,
    pub timestamp: i64,
}

