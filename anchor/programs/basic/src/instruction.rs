use anchor_lang::prelude::*;

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct InitializeTreasury<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 1 + 8, // discriminator + pubkey + bump + total_claimed
        seeds = [b"treasury"],
        bump,
    )]
    pub treasury: Account<'info, Treasury>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(exercise_id: u8)]
pub struct ClaimReward<'info> {
    #[account(
        mut,
        seeds = [b"treasury"],
        bump = treasury.bump,
    )]
    pub treasury: Account<'info, Treasury>,
    #[account(
        init_if_needed,
        payer = user,
        space = 8 + 32 + 13 + 8, // discriminator + pubkey + bool array + total_claimed
        seeds = [b"progress", user.key().as_ref()],
        bump,
    )]
    pub user_progress: Account<'info, UserProgress>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DepositTreasury<'info> {
    #[account(
        mut,
        seeds = [b"treasury"],
        bump = treasury.bump,
    )]
    pub treasury: Account<'info, Treasury>,
    #[account(mut)]
    pub from: Signer<'info>,
    pub system_program: Program<'info, System>,
}
