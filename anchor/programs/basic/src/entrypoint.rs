use crate::processor;
use anchor_lang::prelude::*;
use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, pubkey::Pubkey,
};

// 声明程序入口点
entrypoint!(process_instruction);

// 程序入口点函数
pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    // 使用 Anchor 的指令处理器
    if let Err(error) = processor::process_instruction(program_id, accounts, instruction_data) {
        // 如果出错，返回错误
        return Err(error);
    }
    Ok(())
}

// 添加一些辅助函数
pub fn check_program_account(program_id: &Pubkey) -> ProgramResult {
    if program_id != &crate::ID {
        return Err(ProgramError::IncorrectProgramId);
    }
    Ok(())
}
