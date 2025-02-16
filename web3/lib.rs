// Import anchor
use anchor_lang::prelude::*;

declare_id!("9D6noD85MJf3bbT89u6rorjMmtHgHQQLcAPG11TCLGmj");

#[program]
mod hello_world {
    use super::*;

    pub fn hello(ctx: Context<Hello>) -> Result<()> {
        msg!("Hello, World!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Hello {}
