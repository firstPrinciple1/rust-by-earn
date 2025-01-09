use anchor_lang::prelude::*;
use crate::state::*;
use crate::error::*;

pub fn initialize_treasury(ctx: Context<InitializeTreasury>, bump: u8) -> Result<()> {
    let treasury = &mut ctx.accounts.treasury;
    treasury.authority = ctx.accounts.authority.key();
    treasury.bump = bump;
    treasury.total_claimed = 0;
    Ok(())
}

pub fn claim_reward(ctx: Context<ClaimReward>, exercise_id: u8) -> Result<()> {
    // 验证练习ID
    require!(exercise_id < 13, ErrorCode::InvalidExerciseId);

    let treasury = &mut ctx.accounts.treasury;
    let user = &ctx.accounts.user;
    let user_progress = &mut ctx.accounts.user_progress;
    
    // 验证练习是否已完成
    require!(!user_progress.has_claimed[exercise_id as usize], 
        ErrorCode::AlreadyClaimed);

    // 检查国库余额
    let treasury_balance = ctx.accounts.treasury.to_account_info().lamports();
    let amount = 100_000_000; // 0.1 SOL in lamports
    require!(treasury_balance >= amount, ErrorCode::InsufficientTreasuryBalance);
    
    // 使用 treasury 的 seeds 创建 PDA
    let seeds = &[
        b"treasury",
        &[treasury.bump],
    ];
    let signer = &[&seeds[..]];

    // 执行转账
    anchor_lang::solana_program::program::invoke_signed(
        &anchor_lang::solana_program::system_instruction::transfer(
            &treasury.to_account_info().key(),
            &user.key(),
            amount,
        ),
        &[
            treasury.to_account_info(),
            user.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
        ],
        signer,
    )?;

    // 更新状态
    user_progress.has_claimed[exercise_id as usize] = true;
    user_progress.total_claimed += 1;
    treasury.total_claimed += 1;

    emit!(RewardClaimed {
        user: *user.key,
        exercise_id,
        amount,
        timestamp: Clock::get()?.unix_timestamp,
    });

    Ok(())
}

pub fn deposit_treasury(ctx: Context<DepositTreasury>, amount: u64) -> Result<()> {
    let from = &ctx.accounts.from;
    let treasury = &ctx.accounts.treasury;

    anchor_lang::solana_program::program::invoke(
        &anchor_lang::solana_program::system_instruction::transfer(
            &from.key(),
            &treasury.key(),
            amount,
        ),
        &[
            from.to_account_info(),
            treasury.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
        ],
    )?;

    emit!(TreasuryDeposited {
        from: *from.key,
        amount,
        timestamp: Clock::get()?.unix_timestamp,
    });

    Ok(())
}
