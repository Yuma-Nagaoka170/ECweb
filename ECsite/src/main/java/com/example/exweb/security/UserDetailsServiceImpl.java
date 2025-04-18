package com.example.exweb.security;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.exweb.entity.User;
import com.example.exweb.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
	private final UserRepository userRepository;
	
	public UserDetailsServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException{
		try {
			User user = userRepository.findByEmail(email);
			String userRoleName = user.getName();
			Collection<GrantedAuthority> authorities = new ArrayList<>();
			return new UserDetailsImpl(user, authorities);
		}catch (Exception e) {
			throw new UsernameNotFoundException("ユーザーが見つかりませんでした。");
		}
	}

}
